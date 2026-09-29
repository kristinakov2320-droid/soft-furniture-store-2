ALTER TABLE t_p43817028_soft_furniture_store.products ADD COLUMN sort_order INTEGER;

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn
  FROM t_p43817028_soft_furniture_store.products
)
UPDATE t_p43817028_soft_furniture_store.products p
SET sort_order = ranked.rn
FROM ranked
WHERE p.id = ranked.id;

ALTER TABLE t_p43817028_soft_furniture_store.products ALTER COLUMN sort_order SET DEFAULT 0;
ALTER TABLE t_p43817028_soft_furniture_store.products ALTER COLUMN sort_order SET NOT NULL;
