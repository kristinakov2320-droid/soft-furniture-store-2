import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

const AUTH_URL = "https://functions.poehali.dev/f66f0046-fdd4-4f52-9ba3-caf7e195760c";
const PRODUCTS_URL = "https://functions.poehali.dev/cc987470-88b3-4cb2-a38b-ab04c1988231";
const UPLOAD_URL = "https://functions.poehali.dev/859d4f7d-7403-476f-b1b0-f6abb2e2e1c9";

interface ColorVariant {
  name: string;
  swatch: string;
  images: string[];
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  img: string;
  tag?: string;
  angleType?: string;
  fabric?: string;
  desc: string;
  specs: { label: string; value: string }[];
  colors: ColorVariant[];
  images: string[];
  isActive: boolean;
}

const emptyProduct = (): Omit<Product, "id" | "isActive"> => ({
  name: "",
  category: "sofa",
  price: 0,
  oldPrice: undefined,
  img: "",
  tag: "",
  angleType: "",
  fabric: "",
  desc: "",
  specs: [],
  colors: [],
  images: [],
});

const CATEGORY_LABELS: Record<string, string> = {
  sofa: "Диван",
  garden: "Садовая мебель",
  bed: "Кровать",
  chair: "Кресло",
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct());
  const [specsText, setSpecsText] = useState("");
  const [imagesText, setImagesText] = useState("");
  const [colors, setColors] = useState<ColorVariant[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (token) loadProducts();
  }, [token]);

  async function login() {
    setLoginLoading(true);
    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setLoginLoading(false);
    if (data.success) {
      localStorage.setItem("admin_token", data.token);
      setToken(data.token);
    } else {
      toast({ title: "Неверный пароль", variant: "destructive" });
    }
  }

  async function loadProducts() {
    setLoading(true);
    const res = await fetch(PRODUCTS_URL, { headers: { "X-Admin-Token": token } });
    const data = await res.json();
    setLoading(false);
    if (res.ok) setProducts(data.products || []);
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken("");
  }

  function openAdd() {
    setEditingProduct(null);
    setForm(emptyProduct());
    setSpecsText("");
    setImagesText("");
    setColors([]);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditingProduct(p);
    setForm({
      name: p.name, category: p.category, price: p.price,
      oldPrice: p.oldPrice, img: p.img, tag: p.tag || "",
      angleType: p.angleType || "", fabric: p.fabric || "",
      desc: p.desc, specs: p.specs, colors: p.colors, images: p.images,
    });
    setSpecsText(p.specs.map(s => `${s.label}: ${s.value}`).join("\n"));
    setImagesText(p.images.join("\n"));
    setColors(p.colors.map(c => ({ name: c.name, swatch: c.swatch || "", images: c.images || [] })));
    setShowForm(true);
  }

  function parseSpecs(text: string) {
    return text.split("\n").filter(Boolean).map(line => {
      const idx = line.indexOf(":");
      return idx > -1
        ? { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() }
        : { label: line.trim(), value: "" };
    });
  }

  async function saveProduct() {
    const payload = {
      ...form,
      specs: parseSpecs(specsText),
      colors,
      images: imagesText.split("\n").filter(Boolean).map(u => u.trim()),
    };
    const isEdit = !!editingProduct;
    const url = isEdit ? `${PRODUCTS_URL}?id=${editingProduct!.id}` : PRODUCTS_URL;
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Token": token },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      toast({ title: isEdit ? "Товар обновлён" : "Товар добавлен" });
      setShowForm(false);
      loadProducts();
    } else {
      toast({ title: "Ошибка сохранения", variant: "destructive" });
    }
  }

  async function toggleActive(p: Product) {
    await fetch(`${PRODUCTS_URL}?id=${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Token": token },
      body: JSON.stringify({ isActive: !p.isActive }),
    });
    loadProducts();
  }

  async function deleteProduct(id: number) {
    if (!confirm("Удалить товар?")) return;
    await fetch(`${PRODUCTS_URL}?id=${id}`, {
      method: "DELETE",
      headers: { "X-Admin-Token": token },
    });
    toast({ title: "Товар удалён" });
    loadProducts();
  }

  async function resizeImage(file: File, maxWidth: number, maxHeight: number, quality = 0.85): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height);
          const canvas = document.createElement("canvas");
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  async function uploadImage(file: File, maxWidth = 1600, maxHeight = 1600): Promise<string> {
    const base64 = await resizeImage(file, maxWidth, maxHeight);
    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Token": token },
      body: JSON.stringify({ file: base64, name: file.name.replace(/\.[^.]+$/, ".jpg") }),
    });
    const data = await res.json();
    if (data.url) return data.url;
    throw new Error("Ошибка загрузки");
  }

  async function handleMainPhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    toast({ title: "Загружаю фото..." });
    const url = await uploadImage(file);
    setForm(f => ({ ...f, img: url }));
    toast({ title: "Фото загружено!" });
    e.target.value = "";
  }

  async function handleExtraPhotosUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    toast({ title: `Загружаю ${files.length} фото...` });
    const urls = await Promise.all(files.map(uploadImage));
    setImagesText(t => [...t.split("\n").filter(Boolean), ...urls].join("\n"));
    toast({ title: "Фото загружены!" });
    e.target.value = "";
  }

  function addColor() {
    setColors(c => [...c, { name: "", swatch: "", images: [] }]);
  }

  function removeColor(idx: number) {
    setColors(c => c.filter((_, i) => i !== idx));
  }

  function updateColorName(idx: number, name: string) {
    setColors(c => c.map((col, i) => i === idx ? { ...col, name } : col));
  }

  async function handleSwatchUpload(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    toast({ title: "Загружаю иконку цвета..." });
    const url = await uploadImage(file, 200, 200);
    setColors(c => c.map((col, i) => i === idx ? { ...col, swatch: url } : col));
    toast({ title: "Готово!" });
    e.target.value = "";
  }

  async function handleColorPhotosUpload(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    toast({ title: `Загружаю ${files.length} фото...` });
    try {
      const urls = await Promise.all(files.map(f => uploadImage(f)));
      setColors(c => c.map((col, i) => i === idx ? { ...col, images: [...col.images, ...urls] } : col));
      toast({ title: `Фото загружены! (${urls.length} шт.)` });
    } catch (err) {
      toast({ title: "Ошибка загрузки фото", description: String(err), variant: "destructive" });
    }
    e.target.value = "";
  }

  function removeColorImage(colorIdx: number, imgIdx: number) {
    setColors(c => c.map((col, i) => i === colorIdx
      ? { ...col, images: col.images.filter((_, j) => j !== imgIdx) }
      : col
    ));
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Админ-панель</h1>
          <p className="text-gray-500 text-sm mb-6">Введите пароль для входа</p>
          <div className="space-y-4">
            <div>
              <Label>Пароль</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && login()}
                placeholder="Введите пароль..."
                className="mt-1"
              />
            </div>
            <Button className="w-full" onClick={login} disabled={loginLoading}>
              {loginLoading ? "Вход..." : "Войти"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Управление каталогом</h1>
        <div className="flex items-center gap-3">
          <Button onClick={openAdd} size="sm">
            <Icon name="Plus" size={16} className="mr-1" /> Добавить товар
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <Icon name="LogOut" size={16} className="mr-1" /> Выйти
          </Button>
        </div>
      </header>

      <main className="p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Загрузка...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Icon name="Package" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Товаров пока нет. Нажмите «Добавить товар»</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Фото</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Название</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Категория</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Цена</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Статус</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {p.img ? (
                        <img src={p.img} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon name="Image" size={20} className="text-gray-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{CATEGORY_LABELS[p.category] || p.category}</td>
                    <td className="px-4 py-3 text-gray-900">{p.price.toLocaleString()} ₽</td>
                    <td className="px-4 py-3">
                      <Badge variant={p.isActive ? "default" : "secondary"}>
                        {p.isActive ? "Активен" : "Скрыт"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(p)} title="Редактировать">
                          <Icon name="Pencil" size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => toggleActive(p)} title={p.isActive ? "Скрыть" : "Показать"}>
                          <Icon name={p.isActive ? "EyeOff" : "Eye"} size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteProduct(p.id)} title="Удалить" className="text-red-500 hover:text-red-600">
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4" onKeyDown={e => { if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") e.preventDefault(); }}>
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold">{editingProduct ? "Редактировать товар" : "Новый товар"}</h2>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                <Icon name="X" size={18} />
              </Button>
            </div>
            <div className="p-6 space-y-4">

              {/* Название + Категория */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Название *</Label>
                  <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sofa">Диван</SelectItem>
                      <SelectItem value="garden">Садовая мебель</SelectItem>
                      <SelectItem value="bed">Кровать</SelectItem>
                      <SelectItem value="chair">Кресло</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Цена */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Цена (₽) *</Label>
                  <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="mt-1" />
                </div>
                <div>
                  <Label>Старая цена (₽)</Label>
                  <Input type="number" value={form.oldPrice || ""} onChange={e => setForm({ ...form, oldPrice: e.target.value ? Number(e.target.value) : undefined })} className="mt-1" />
                </div>
              </div>

              {/* Главное фото */}
              <div>
                <Label>Главное фото</Label>
                <div className="mt-1 flex gap-2">
                  <Input value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} placeholder="https://..." className="flex-1" />
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleMainPhotoUpload} />
                    <div className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-50 transition-colors whitespace-nowrap">
                      <Icon name="Upload" size={14} /> Загрузить
                    </div>
                  </label>
                </div>
                {form.img && <img src={form.img} alt="preview" className="mt-2 h-24 w-24 object-cover rounded-lg border" />}
              </div>

              {/* Тег / Угол / Обивка */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Тег</Label>
                  <Input value={form.tag || ""} onChange={e => setForm({ ...form, tag: e.target.value })} className="mt-1" placeholder="Акция" />
                </div>
                <div>
                  <Label>Тип угла</Label>
                  <Select value={form.angleType || ""} onValueChange={v => setForm({ ...form, angleType: v })}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="—" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="прямой">Прямой</SelectItem>
                      <SelectItem value="угловой">Угловой</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Обивка</Label>
                  <Select value={form.fabric || ""} onValueChange={v => setForm({ ...form, fabric: v })}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="—" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="велюр">Велюр</SelectItem>
                      <SelectItem value="рогожка">Рогожка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Описание */}
              <div>
                <Label>Описание</Label>
                <Textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} className="mt-1" rows={3} />
              </div>

              {/* Характеристики */}
              <div>
                <Label>Характеристики <span className="text-gray-400 font-normal">(каждая с новой строки, формат: Название: Значение)</span></Label>
                <Textarea
                  value={specsText}
                  onChange={e => setSpecsText(e.target.value)}
                  className="mt-1 font-mono text-xs"
                  rows={4}
                  placeholder={"Ширина: 240 см\nВысота: 90 см\nГарантия: 18 месяцев"}
                />
              </div>

              {/* Варианты цветов */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Варианты цветов</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addColor}>
                    <Icon name="Plus" size={14} className="mr-1" /> Добавить цвет
                  </Button>
                </div>

                {colors.length === 0 && (
                  <p className="text-sm text-gray-400 py-3 text-center border rounded-lg">Нет вариантов цветов. Нажмите «Добавить цвет»</p>
                )}

                <div className="space-y-3">
                  {colors.map((color, idx) => (
                    <div key={idx} className="border rounded-xl p-4 bg-gray-50 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 w-6">{idx + 1}.</span>
                        <Input
                          value={color.name}
                          onChange={e => updateColorName(idx, e.target.value)}
                          placeholder="Название цвета (напр. Синий)"
                          className="flex-1 bg-white"
                        />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeColor(idx)} className="text-red-400 hover:text-red-600 shrink-0">
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>

                      {/* Иконка цвета (swatch) */}
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          {color.swatch ? (
                            <img src={color.swatch} alt="swatch" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow flex items-center justify-center">
                              <Icon name="Image" size={14} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Иконка цвета (маленькое круглое фото)</p>
                          <label className="cursor-pointer inline-flex items-center gap-1 px-2 py-1 border rounded text-xs bg-white hover:bg-gray-50">
                            <input type="file" accept="image/*" className="hidden" onChange={e => handleSwatchUpload(idx, e)} />
                            <Icon name="Upload" size={12} /> Загрузить иконку
                          </label>
                        </div>
                      </div>

                      {/* Фото этого цвета */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-gray-500">Фото для этого цвета</p>
                          <label className="cursor-pointer inline-flex items-center gap-1 px-2 py-1 border rounded text-xs bg-white hover:bg-gray-50">
                            <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleColorPhotosUpload(idx, e)} />
                            <Icon name="Upload" size={12} /> Загрузить фото
                          </label>
                        </div>
                        {color.images.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {color.images.map((img, imgIdx) => (
                              <div key={imgIdx} className="relative group">
                                <img src={img} alt="" className="w-14 h-14 object-cover rounded-lg border" />
                                <button
                                  type="button"
                                  onClick={() => removeColorImage(idx, imgIdx)}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center"
                                >×</button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">Нет фото — загрузите через кнопку выше</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Общие фото товара */}
              <div>
                <div className="flex items-center justify-between">
                  <Label>Общие фото товара <span className="text-gray-400 font-normal">(показываются по умолчанию)</span></Label>
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleExtraPhotosUpload} />
                    <div className="flex items-center gap-1 px-2 py-1 border rounded text-xs bg-white hover:bg-gray-50 transition-colors">
                      <Icon name="Upload" size={12} /> Загрузить фото
                    </div>
                  </label>
                </div>
                <Textarea
                  value={imagesText}
                  onChange={e => setImagesText(e.target.value)}
                  className="mt-1 font-mono text-xs"
                  rows={3}
                  placeholder={"https://...\nhttps://..."}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" onClick={saveProduct} className="flex-1">
                  {editingProduct ? "Сохранить изменения" : "Добавить товар"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Отмена</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}