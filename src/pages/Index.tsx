import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";


const HERO_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/44c04827-b8a2-4dd5-a1b7-8b604e07ba3b.jpg";
const GARDEN_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/83033b65-7386-435d-b653-94fddc213166.jpg";
const SHOWROOM_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/files/c66e0e66-19b9-4ec7-b64b-3e8efa991827.jpg";

const FARELL_SET = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/914c8a59-3e47-4a46-989c-88db594d9867.jpg";
const FARELL_SOFA = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/280b420e-136d-48a2-8315-2173c4eb006a.jpg";
const FARELL_CHAIR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/ba1c2848-c465-4796-b98f-0b4bececaad8.jpg";
const FARELL_TABLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/79cb88b3-2d26-48c8-8783-c5362afa0719.jpg";
const FARELL_POUF = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f915ce97-2dbe-42a4-a0cf-49011193cff8.jpg";
const FARELL_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5300ce1a-9c41-4883-9312-ec2c10276dce.jpg";
const FARELL_GREY_SET = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5d102f0c-7036-4937-9bd3-62ceaea979c6.jpg";
const FARELL_GREY_SOFA = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/603d31b5-d280-477b-8540-369a21100951.jpg";
const FARELL_GREY_CHAIR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/6e434d00-0341-4258-99fe-1d6531ca9aac.jpg";
const FARELL_GREY_POUF = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f83232aa-7a7c-42df-bbaa-d1ac16b64a2c.jpg";
const FARELL_GREY_TABLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/002795c6-cff0-4304-946b-a09d8b3cf957.jpg";
const FARELL_GREY_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7e19a8f2-cc10-43d3-b36b-c30c2da01ae5.jpg";

type Section = "home" | "catalog" | "about" | "contacts" | "faq" | "cart";

const DUBAI_COFFEE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/edbc1d40-8567-4e0e-bed7-264c9074662a.jpg";
const DUBAI_COFFEE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7e2f6c1a-da4b-4915-8772-f03e28e04094.jpg";
const DUBAI_COFFEE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/0a199a81-6f37-4d06-bb46-c032a961f151.jpg";
const DUBAI_COFFEE_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/79076fcf-a215-4de3-bbd3-48bbff8b611b.jpg";
const DUBAI_HONEY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/d41cec92-0f5f-48a1-b3a5-b09d52016634.jpg";
const DUBAI_HONEY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/8978b079-4c31-4657-b3bd-a4b0d7d1f789.jpg";
const DUBAI_HONEY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/1ecae50f-15df-401b-b869-0c9f85e91f98.jpg";
const DUBAI_HONEY_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/33823130-2ff5-4f74-9e05-4166bdd2d9d6.jpg";
const DUBAI_GREY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/9e64d7ce-9cd9-4dd3-991c-b9d7021bf7ee.jpg";
const DUBAI_GREY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/6b908898-d7cf-4c08-b63a-db9bcc439f9a.jpg";
const DUBAI_GREY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/55c66cda-8d53-484b-aa28-f9eca66ac256.jpg";
const DUBAI_GREY_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/9fdccfab-43c7-45b9-8592-507206af539f.jpg";
const DUBAI_BLUE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7bd5eef7-b283-477c-9f09-f9bdfdd10d3f.jpg";
const DUBAI_BLUE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/61af66a9-7c53-41af-9f4c-15e0e5eaaa0d.jpg";
const DUBAI_BLUE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b64da040-4b78-4daf-bd75-bdb81da70b6f.jpg";
const DUBAI_BLUE_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b15b3747-bfe5-4337-84d7-991044d75827.jpg";
const ROGOJKA_BEIGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a389bbba-23dd-4b56-899d-d2317ab26cee.jpg";
const ROGOJKA_COFFEE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f1b9a482-58b8-46af-857c-4847ef4e3917.jpg";
const ROGOJKA_HONEY = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/985b83d3-f532-4f91-81af-58a255e5db43.jpg";
const ROGOJKA_GREY = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/334bb3de-ee3c-4dec-a59a-f195d0648310.jpg";
const ROGOJKA_BLUE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/46919192-f2f6-4f7b-a677-abb571901185.jpg";
const VELVET_EMERALD = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7ad6636c-e785-4898-a1b0-817c74a1a421.jpg";
const VELVET_CHOCOLATE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/19dbaa83-4956-42d1-8120-ea5f77c5ae71.jpg";
const VELVET_MINT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b9a818cd-a59c-4b69-b5c0-b4ca163ddba8.jpg";
const VELVET_LGREY = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b01460c2-6ca9-4767-a94b-238dfb5d32f4.jpg";
const VELVET_BLUE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f12ee5bf-0cf4-4300-8af6-16ef12060d2a.jpg";

const LIBERTY_BEIGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/4b410866-de7b-48af-9cbe-db2d7a9a9d2f.jpg";
const LIBERTY_BEIGE_2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/09049858-f497-4f1f-a50d-543a7db6d6b9.jpg";
const LIBERTY_BEIGE_3 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/de82509f-d634-41dd-8954-4da566855028.jpg";
const LIBERTY_BEIGE_4 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/8b621b50-24ce-48b9-ac02-b367f3ffc987.jpg";
const LIBERTY_BEIGE_5 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b967c61e-80f3-4638-85c9-2b7aa345a6b5.jpg";
const LIBERTY_BEIGE_6 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/49024401-e5df-4c5a-8b68-876329ce1f09.jpg";
const LIBERTY_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/49024401-e5df-4c5a-8b68-876329ce1f09.jpg";
const LIBERTY_GREEN = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/70e8a243-f774-40e0-846a-0a7e4d2c4dec.jpg";
const LIBERTY_GREEN_2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/d945a851-0a8c-42d7-93b5-6f3a6d07a3b0.jpg";
const LIBERTY_GREEN_3 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/d35ef5a6-004f-439a-b68b-c4ced16099e2.jpg";
const LIBERTY_GREEN_4 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/955f1ef0-52f0-44d7-8e5a-8391facdc744.jpg";
const LIBERTY_GREEN_5 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/dd108ae2-b8f1-455b-a911-5d52e6bc9088.jpg";
const LIBERTY_GREEN_6 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/489a3631-d5b1-4f12-95ae-7c3c57eff380.jpg";
const LIBERTY_LGREY = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/916b75d0-369c-4773-8fa5-d7a740f9129f.jpg";
const LIBERTY_LGREY_2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/000c0701-c1aa-4614-8b2a-9550a93cd77c.jpg";
const LIBERTY_LGREY_3 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/94f5592f-8f8a-4c9d-b34e-d0593e3d2a0e.jpg";
const LIBERTY_LGREY_4 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7f6f2341-e8a0-4cb4-b5c6-c948a3f3e818.jpg";
const LIBERTY_LGREY_5 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/d68d0cc0-6dcf-416b-a336-6d51810aaa1e.jpg";
const LIBERTY_LGREY_6 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/8b1bda31-3532-479b-a571-4b79a80c9ca8.jpg";
const LIBERTY_DGREY = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/11e16f82-0bbf-49ac-b849-a57028b94191.jpg";
const LIBERTY_DGREY_2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/ce4730b4-73e8-4e08-b598-1f862343d91b.jpg";
const LIBERTY_DGREY_3 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b187d13e-42a3-4e5f-b454-9aadc70e793d.jpg";
const LIBERTY_DGREY_4 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/6b00d059-11fc-49c7-86c5-7b04765547c5.jpg";
const LIBERTY_DGREY_5 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/0ed867d2-170a-49f6-9ad8-87f969c1bbe9.jpg";
const LIBERTY_DGREY_6 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/4ddcbc92-990c-4005-9768-a775c55c2cc5.jpg";
const MALAGA_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/3946c9a3-4a91-4663-808f-1ae68d85d1ed.jpg";
const MALAGA_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/ad737619-4ef0-4c28-b2d8-5f832c1ea5e3.jpg";
const MALAGA_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/88470d94-f58f-48cf-87ce-11e343ce3d76.jpg";
const MALAGA_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e1f57707-c827-4146-8e4c-8db9886783c3.jpg";
const MALAGA_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/13fbf4b2-533d-4927-9b99-f8a76437bc67.jpg";
const MALAGA_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a52bf45e-4244-41cb-89eb-2462fda8e863.jpg";
const MALAGA_COFFEE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/c4ba0c14-dd92-42af-a1a9-7803b7c069af.jpg";
const MALAGA_COFFEE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a53fa02e-eacf-448a-a2c6-8f408494e12f.jpg";
const MALAGA_COFFEE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/2907ccf1-1052-4dbd-bf52-aafd665076cd.jpg";
const MALAGA_COFFEE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/05cb194e-c04c-4d6a-9e8e-f630e39defcb.jpg";
const MALAGA_COFFEE_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/78447c43-c453-49ba-8b9e-ffa053c3b635.jpg";
const MALAGA_HONEY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/45bed17f-81e0-4950-b4a2-2fef05351eb3.jpg";
const MALAGA_HONEY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e4e339fd-e6d8-4a9e-be10-e3a57a3b41da.jpg";
const MALAGA_HONEY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/86ed0518-d688-47c3-a0aa-ec33d98d7e8d.jpg";
const MALAGA_GREY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/70d7299b-3acb-4c00-bf3e-135144e09d69.jpg";
const MALAGA_GREY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/d95badc7-dc13-4dd6-86d3-d9bddde3f977.jpg";
const MALAGA_GREY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/8471300a-6900-4350-abca-6afaedff5e97.jpg";
const MALAGA_GREY_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/efe60b82-d0e3-407a-992e-35205184db36.jpg";
const MALAGA_GREY_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/75c46c70-089d-42cc-8647-f2529d969a51.jpg";
const MALAGA_BLUE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/c30331b2-fd8f-4076-8dac-2672ea3a406a.jpg";
const MALAGA_BLUE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/18a9fc0d-300f-4402-9a55-bf151a3966ed.jpg";
const MALAGA_BLUE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/bdeafa2c-d1f0-4098-b84d-5572817eff39.jpg";
const MALAGA_BLUE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/6cf72a12-f6f2-449a-90a5-4853e0bef721.jpg";
const MALAGA_BLUE_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e54e64cf-1a19-48d0-9617-3880af49caad.jpg";
const MALAGA_HONEY_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/86d342a6-fada-4175-9208-f8742fdef222.jpg";
const MALAGA_HONEY_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/8534d866-f8af-49c1-a7b3-389fef31c0c1.jpg";
const MALAGA_COFFEE_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7ba2bf23-ae71-454f-84e8-5398d65f3d23.jpg";
const MALAGA_HONEY_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f17125b2-09fd-4efb-acb3-5803a0ec5173.jpg";
const MALAGA_GREY_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f93850ab-abe9-409b-9b1d-9ce709332ba4.jpg";
const MALAGA_BLUE_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/16d5572b-8cc8-42e5-9af4-60584893bc5e.jpg";
const MALAGA_LIGHTBLUE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/dec3361d-b0ed-4b31-ace9-11319c15062c.jpg";
const MALAGA_LIGHTBLUE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/d726c149-8b15-442d-8fee-e133b165a0bc.jpg";
const MALAGA_LIGHTBLUE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/00b846c4-60d7-41b3-ba6a-e95359ef0a95.jpg";
const MALAGA_LIGHTBLUE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/2aa199f7-ea51-4ea8-946c-b9bd14650576.jpg";
const MALAGA_LIGHTBLUE_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/4bbe6aea-22e9-47a8-8300-0fe393ffc2d3.jpg";
const MALAGA_LIGHTBLUE_SWATCH = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/dec3361d-b0ed-4b31-ace9-11319c15062c.jpg";
const MALAGA_LIGHTBLUE_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/679dcc68-2f70-4933-a889-561bd7d3aa07.jpg";
const MALAGA_ULTRA_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/3257e4d7-36c9-4a66-bf04-ea60879f70f9.jpg";
const MALAGA_ULTRA_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/c1008a25-b54a-44e5-9d23-dc175360a191.jpg";
const MALAGA_ULTRA_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f3eded9b-0d7f-45c4-845f-047421f88138.jpg";
const MALAGA_ULTRA_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f796cc6e-2a9b-4cfa-90a1-2085e9f70675.jpg";
const MALAGA_ULTRA_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5e9fe8b8-d855-46e9-97d7-be25e0407511.jpg";
const MALAGA_ULTRA_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/3de9db44-28fe-4f9f-aea2-7fea9681e76f.jpg";

const KADIS_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/efb98718-9bd5-45c0-a4f1-72b58ca985be.jpg";
const KADIS_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/03709229-72da-452b-ab07-3cb4b5dd5863.jpg";
const KADIS_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/0c60518a-53d8-49e1-9b35-6693bbf9bf57.jpg";
const KADIS_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/de95114a-51f6-4d4e-a00e-de7b7cc6a143.jpg";
const KADIS_COFFEE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/2d3761fb-83ce-4204-9383-74737e47b085.jpg";
const KADIS_COFFEE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/85afd861-28f6-4e98-9de5-77263b8daaf7.jpg";
const KADIS_COFFEE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/4a8e23b8-0714-4577-abf1-0fa3643d7482.jpg";
const KADIS_COFFEE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e3008abc-9c2c-443c-8bc2-98e14719533c.jpg";
const KADIS_HONEY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/1c0d8e51-9b80-4d92-8727-03bd8a8eafbe.jpg";
const KADIS_HONEY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/8e91aa37-d4dc-4655-9f77-5144a33259fb.jpg";
const KADIS_HONEY_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/3afde386-c63b-4881-b166-28f5278ff267.jpg";
const KADIS_HONEY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/ddeb90c5-e71e-42ba-92f2-9e170059b07c.jpg";
const KADIS_GREY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a037b8f2-2d88-4f5d-845f-257ceb525253.jpg";
const KADIS_GREY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b7af572e-6dd7-4a43-9a27-1cd34f513bea.jpg";
const KADIS_GREY_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/00300348-7365-4929-b011-b980947260e6.jpg";
const KADIS_GREY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5c3839ec-526f-4724-a952-0b36354a59f9.jpg";
const KADIS_BLUE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/6cead465-f758-457a-8683-db724daca223.jpg";
const KADIS_BLUE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/10a87395-08a7-4754-8cb8-21ff61b431af.jpg";
const KADIS_BLUE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/066ac3f4-9a86-4bf1-b10e-cc5ca299501c.jpg";
const KADIS_BLUE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/65b45dd6-c791-48b2-8a36-b5dabdcfb970.jpg";
const KADIS_BEIGE_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/9122e8ce-9031-498a-9e3f-fcc844629a89.jpg";
const KADIS_COFFEE_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e359776f-aee5-4ac6-aaa7-c14835ebaa17.jpg";
const KADIS_HONEY_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/1da6183a-c097-45f4-a91d-adfcabb2aa8e.jpg";
const KADIS_GREY_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/96478fca-1ce2-455b-95a7-dbd1f90b809f.jpg";
const KADIS_BLUE_INTERIOR = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/bb02f74f-8fc9-44a3-9cf8-3521816a2082.jpg";

const ATLANTA_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/71532990-2a41-453b-ac57-787d13d7f398.jpg";
const ATLANTA_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/c169294a-2223-4ba7-a773-60c8a4873a55.jpg";
const ATLANTA_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/796c0b11-fec1-4808-9875-4f9f29d76ecf.jpg";
const ATLANTA_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/47408c90-b56b-4821-ab00-bd947ece1342.jpg";
const ATLANTA_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/07490716-c219-48ac-b996-0f741d9f85d9.jpg";

const MONZA_EMERALD_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/34eb44b4-8a60-4124-b49d-fa59700736c4.jpg";
const MONZA_EMERALD_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/dc9a47f1-b000-4f2a-8a85-39d3f55010d3.jpg";
const MONZA_EMERALD_BED1 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/411ac192-0234-4e26-bde4-1f990aef1901.jpg";
const MONZA_EMERALD_BED2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/d2fa5db5-a713-4a31-ba02-8bda71a33633.jpg";
const MONZA_EMERALD_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/49d0e4f9-76ea-4497-ab84-feeb6712e971.jpg";

const MONZA_MINT_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/813e7ee8-579d-404a-b540-be8a3dd79e77.jpg";
const MONZA_MINT_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/6093b280-2a51-46e6-84c6-37ce00a418b1.jpg";
const MONZA_MINT_BED1 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/fb0d010d-fb7d-47c6-917b-f673b10ec46a.jpg";
const MONZA_MINT_BED2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/fe8f5b60-8bd3-4145-ade6-323d3412680c.jpg";
const MONZA_MINT_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/0c838fa5-e91b-49bd-9a1e-e6faa29eac1d.jpg";

const MONZA_LGREY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/425c87da-51b6-40cb-8b47-97b68b922831.jpg";
const MONZA_LGREY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/c08644ea-b8fd-481e-a90c-efd869404142.jpg";
const MONZA_LGREY_BED1 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/968f202e-4a10-4e53-a7d6-92d8e40b5a37.jpg";
const MONZA_LGREY_BED2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a017f1b2-54b2-4490-89ab-fec3915b94d9.jpg";
const MONZA_LGREY_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/130cf671-ba81-42b4-9207-b0af9501e5b4.jpg";

const MONZA_BLUE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/8e191f10-1fd6-45d7-a7c3-7fe40a72c8a5.jpg";
const MONZA_BLUE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/494a6fe0-f0b3-4d97-a286-4b14e74fcc8d.jpg";
const MONZA_BLUE_BED1 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/8179ad1f-216b-4114-ad30-48c43d86ebe7.jpg";
const MONZA_BLUE_BED2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e77a2c10-6fe9-40ab-a919-0de6cdcf3ea6.jpg";
const MONZA_BLUE_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e8835d43-7099-4c39-9bf7-9078e4f226b6.jpg";
const ATLANTA_COFFEE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/1b58f826-4c1d-4070-8668-47b42974eb35.jpg";
const ATLANTA_COFFEE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/efb69e8b-7f0b-4fd9-ab00-024ff3682711.jpg";
const ATLANTA_COFFEE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/6fa39447-850c-48c0-ab38-0c19868aa3dc.jpg";
const ATLANTA_COFFEE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/4597654f-db53-4f85-8e19-d92d4a8672f1.jpg";
const ATLANTA_COFFEE_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e99f30a1-5180-4ff0-9981-b99ded351950.jpg";
const ATLANTA_HONEY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/42c37c3f-ad9d-4602-aa26-4b8c54371bfb.jpg";
const ATLANTA_HONEY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/df6a9eeb-87ac-4b4a-b507-3dfc7017cda9.jpg";
const ATLANTA_HONEY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5f9bd78c-6e0a-4a1a-a4ae-9cb566cb4127.jpg";
const ATLANTA_HONEY_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/9a8b6192-1726-464d-b5bc-9210934bb525.jpg";
const ATLANTA_HONEY_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/03c93145-2f2f-4ae9-9d76-43da2a9b9348.jpg";
const ATLANTA_GREY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/61fb9bb6-ae4a-47be-a7c3-247ea59e7c9b.jpg";
const ATLANTA_GREY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a32217ac-22be-4d2d-b768-8e2c17e310d6.jpg";
const ATLANTA_GREY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/cae7ebca-1746-47e9-9702-55ae4b051b9e.jpg";
const ATLANTA_GREY_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/af11761c-d7c4-4bd9-abc4-c87ba3c8f375.jpg";
const ATLANTA_GREY_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/67829cdc-801d-4553-8609-8d9da9ea1e17.jpg";
const ATLANTA_BLUE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/48da113c-cc74-4ef7-9746-4ab5be78cfd5.jpg";
const ATLANTA_BLUE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e7e61fb5-0e33-4f59-976f-9a901314c641.jpg";
const ATLANTA_BLUE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/c4665e02-a89c-4322-9b09-61d130c4a6c9.jpg";
const ATLANTA_BLUE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/58de5fda-32d7-4c15-b8a0-80445e560423.jpg";
const ATLANTA_BLUE_BACK = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/fcda1084-8a82-41a3-a410-97a56c1c6f99.jpg";

const REIN_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b2836fa4-9c52-498d-b03b-df8f7573ceee.jpg";
const REIN_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/68e00dd6-430c-4ff4-843f-5a524ebd1798.jpg";
const REIN_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a28f3a47-e814-47b6-ae5f-92b6960eb33b.jpg";
const REIN_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/17f18565-8fee-4726-8056-0f887a30d362.jpg";
const REIN_COFFEE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/b023e68a-cdae-4b48-86b6-be1b5b095eee.jpg";
const REIN_COFFEE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/51955a93-e54c-480f-a227-32ee2e19edcb.jpg";
const REIN_COFFEE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/04ee527c-2cbb-43ae-80a9-919f4b2103fd.jpg";
const REIN_COFFEE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a25d3168-5d46-458e-b155-ff0c57a7b0a7.jpg";
const REIN_HONEY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/fcc3119a-5ccb-4ed0-bad2-1bfc2122be54.jpg";
const REIN_HONEY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/850d3a5e-2055-4747-ab8c-a6ac94b505a7.jpg";
const REIN_HONEY_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/0b05ff77-80a7-4cd0-85dd-20d9cc294b83.jpg";
const REIN_HONEY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a1ce0c75-6fcc-4a70-b518-8aa11842ce3f.jpg";
const REIN_GREY_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/e045b978-da23-4474-a6ab-8a11ad6da097.jpg";
const REIN_GREY_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/3cd2e0ff-a1bf-46db-a06c-e9f40c227d68.jpg";
const REIN_GREY_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/468d2126-2bda-45ee-9539-c6103d55423f.jpg";
const REIN_GREY_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/0465534b-9c05-44c3-87fc-cc3e2b8ad435.jpg";
const REIN_BLUE_FRONT = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5621de5b-14c6-4574-8abb-a77019f70be6.jpg";
const REIN_BLUE_ANGLE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/57c9a075-462d-4bd4-a342-bcbc1585b99c.jpg";
const REIN_BLUE_STORAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/cf22898f-2149-426c-966c-c82c5f5a4aa6.jpg";
const REIN_BLUE_BED = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/efc0ac5c-e7a7-461a-aa95-fa2a168a65b3.jpg";

const OASIS_IMAGE = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/ac269839-175f-422b-8f85-26520562cb1a.jpg";
const OASIS_2 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/58df0632-46ee-4fc0-9c6b-28b93aca70e9.jpg";
const OASIS_3 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/52ee79b9-7a9f-40ce-a20f-280be918369c.jpg";
const OASIS_4 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/240da403-b6c5-4a63-a6cd-306a75026db3.jpg";
const OASIS_5 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/33e92a3f-07e6-4d9c-8bf6-e4cdafacdc5f.jpg";
const OASIS_6 = "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/610b60d0-3a6c-46b1-b9a1-dd8cad1857be.jpg";

const catalogProducts = [
  {
    id: 1, name: "Либерти", category: "sofa", price: 69399, img: LIBERTY_BEIGE,
    angleType: "угловой", fabric: "велюр", createdAt: 2,
    images: [LIBERTY_BEIGE, LIBERTY_BEIGE_2, LIBERTY_BEIGE_3, LIBERTY_BEIGE_4, LIBERTY_BEIGE_5, LIBERTY_BEIGE_6],
    colors: [
      { name: "Бежевый", swatch: LIBERTY_INTERIOR, images: [LIBERTY_BEIGE, LIBERTY_BEIGE_2, LIBERTY_BEIGE_3, LIBERTY_BEIGE_4, LIBERTY_BEIGE_5, LIBERTY_BEIGE_6] },
      { name: "Зелёный", swatch: LIBERTY_GREEN, images: [LIBERTY_GREEN_2, LIBERTY_GREEN_3, LIBERTY_GREEN_4, LIBERTY_GREEN_5, LIBERTY_GREEN_6, LIBERTY_GREEN] },
      { name: "Светло-серый", swatch: LIBERTY_LGREY, images: [LIBERTY_LGREY_2, LIBERTY_LGREY_3, LIBERTY_LGREY_4, LIBERTY_LGREY_5, LIBERTY_LGREY_6, LIBERTY_LGREY] },
      { name: "Тёмно-серый", swatch: LIBERTY_DGREY, images: [LIBERTY_DGREY_2, LIBERTY_DGREY_3, LIBERTY_DGREY_4, LIBERTY_DGREY_5, LIBERTY_DGREY_6, LIBERTY_DGREY] },
    ],
    desc: "Большой современный диван из трёх секций станет стильным и функциональным акцентом в вашей гостиной.",
    specs: [
      { label: "Размер дивана", value: "334 × 80 × 168 см" },
      { label: "Спальное место", value: "298 × 166 см" },
      { label: "Глубина сиденья", value: "68 см" },
      { label: "Глубина сиденья без подушек", value: "98 см" },
      { label: "Высота сиденья", value: "40 см" },
      { label: "Ширина сиденья", value: "298 см" },
      { label: "Ширина сиденья оттоманки", value: "99 см" },
      { label: "Высота спинки", value: "28 см" },
      { label: "Высота ножек", value: "2,5 см" },
      { label: "Высота подлокотников", value: "58 см" },
      { label: "Ширина левого подлокотника", value: "18 см" },
      { label: "Ширина правого подлокотника", value: "18 см" },
      { label: "Ящик для белья", value: "99,5 × 19,5 × 80 см — 3 шт." },
      { label: "Приспинные подушки", value: "98 × 41 × 28 см — 3 шт." },
      { label: "Каркас", value: "ДСП (ЛДСП)" },
      { label: "Основа сиденья", value: "Ламели ДСП (ЛДСП)" },
      { label: "Наполнитель", value: "Пенополиуретан" },
      { label: "Тип угла", value: "Универсальный" },
      { label: "Нагрузка на одно место", value: "До 90 кг" },
      { label: "Коробка 1", value: "100 × 39 × 100 см — 46 кг" },
      { label: "Коробка 2", value: "100 × 39 × 100 см — 46 кг" },
      { label: "Коробка 3", value: "123 × 37 × 59 см — 26 кг" },
      { label: "Коробка 4", value: "100 × 53 × 42 см — 6 кг" },
      { label: "Коробка 5", value: "147 × 46 × 100 см — 60 кг" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 2, name: "Фарелл", category: "garden", price: 44999, img: FARELL_SET,
    angleType: "прямой", fabric: "рогожка", createdAt: 5,
    images: [FARELL_SET, FARELL_SOFA, FARELL_CHAIR, FARELL_TABLE, FARELL_POUF, FARELL_INTERIOR],
    colors: [
      { name: "Градиент", swatch: FARELL_INTERIOR, images: [FARELL_SET, FARELL_SOFA, FARELL_CHAIR, FARELL_TABLE, FARELL_POUF, FARELL_INTERIOR] },
      { name: "Серый", swatch: FARELL_GREY_INTERIOR, images: [FARELL_GREY_SET, FARELL_GREY_SOFA, FARELL_GREY_CHAIR, FARELL_GREY_POUF, FARELL_GREY_TABLE, FARELL_GREY_INTERIOR] },
    ],
    desc: "Комплект садовой мебели из ротанга с алюминиевым каркасом. Не боится влаги и перепадов температур. Подушки входят в комплект.",
    specs: [
      { label: "Комплект", value: "Диван + 2 кресла + столик" },
      { label: "Материал", value: "Искусственный ротанг PE" },
      { label: "Каркас", value: "Алюминий, порошковая окраска" },
      { label: "Подушки", value: "Влагостойкая ткань, входят в комплект" },
      { label: "Нагрузка", value: "До 150 кг на место" },
      { label: "Уход", value: "Протирать влажной тряпкой" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 3, name: "Моника", category: "bed", price: 24999, img: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/3ad5b393-8b63-4162-b394-f9be6af5fe4e.jpg", tag: "",
    angleType: "прямой", fabric: "велюр", createdAt: 7,
    images: ["https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/3ad5b393-8b63-4162-b394-f9be6af5fe4e.jpg", "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5eda887c-89c3-416b-b309-832f244149bf.jpg"],
    colors: [
      { name: "Бежевый (велюр)", swatch: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5eda887c-89c3-416b-b309-832f244149bf.jpg" },
    ],
    desc: "Кровать с мягким изголовьем в скандинавском стиле. Вертикальная стёжка придаёт объём и благородство. Обивка — бежевый велюр.",
    specs: [
      { label: "Спальное место", value: "160×200 / 180×200 см" },
      { label: "Высота изголовья", value: "120 см" },
      { label: "Механизм", value: "Подъёмный, газлифт" },
      { label: "Каркас", value: "ЛДСП 25мм + металл" },
      { label: "Обивка", value: "Велюр, бежевый" },
      { label: "Ножки", value: "Массив дерева, натуральный" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },

  {
    id: 9, name: "Малага", category: "sofa", price: 14999, img: MALAGA_FRONT,
    angleType: "прямой", fabric: "рогожка", createdAt: 3,
    images: [MALAGA_FRONT, MALAGA_ANGLE, MALAGA_BED, MALAGA_STORAGE, MALAGA_BACK, MALAGA_INTERIOR],
    colors: [
      { name: "Бежевый", swatch: MALAGA_INTERIOR, images: [MALAGA_FRONT, MALAGA_ANGLE, MALAGA_BED, MALAGA_STORAGE, MALAGA_BACK, MALAGA_INTERIOR] },
      { name: "Кофейный", swatch: MALAGA_COFFEE_INTERIOR, images: [MALAGA_COFFEE_FRONT, MALAGA_COFFEE_ANGLE, MALAGA_COFFEE_BED, MALAGA_COFFEE_STORAGE, MALAGA_COFFEE_BACK, MALAGA_COFFEE_INTERIOR] },
      { name: "Медово-коричневый", swatch: MALAGA_HONEY_INTERIOR, images: [MALAGA_HONEY_FRONT, MALAGA_HONEY_ANGLE, MALAGA_HONEY_BED, MALAGA_HONEY_STORAGE, MALAGA_HONEY_BACK, MALAGA_HONEY_INTERIOR] },
      { name: "Серый", swatch: MALAGA_GREY_INTERIOR, images: [MALAGA_GREY_FRONT, MALAGA_GREY_ANGLE, MALAGA_GREY_BED, MALAGA_GREY_STORAGE, MALAGA_GREY_BACK, MALAGA_GREY_INTERIOR] },
      { name: "Синий", swatch: MALAGA_BLUE_INTERIOR, images: [MALAGA_BLUE_FRONT, MALAGA_BLUE_ANGLE, MALAGA_BLUE_BED, MALAGA_BLUE_STORAGE, MALAGA_BLUE_BACK, MALAGA_BLUE_INTERIOR] },
      { name: "Голубой", swatch: MALAGA_LIGHTBLUE_INTERIOR, images: [MALAGA_LIGHTBLUE_FRONT, MALAGA_LIGHTBLUE_ANGLE, MALAGA_LIGHTBLUE_BED, MALAGA_LIGHTBLUE_STORAGE, MALAGA_LIGHTBLUE_BACK, MALAGA_LIGHTBLUE_INTERIOR] },
      { name: "Ультрамарин", swatch: MALAGA_ULTRA_INTERIOR, images: [MALAGA_ULTRA_FRONT, MALAGA_ULTRA_ANGLE, MALAGA_ULTRA_BED, MALAGA_ULTRA_STORAGE, MALAGA_ULTRA_BACK, MALAGA_ULTRA_INTERIOR] },
    ],
    desc: "Компактный прямой диван-кровать из рогожки с ящиком для хранения. Лаконичный дизайн, раскладной механизм. Идеален для небольших гостиных и детских комнат.",
    specs: [
      { label: "Тип", value: "Прямой диван-кровать" },
      { label: "Основа сиденья", value: "ДСП (ЛДСП)" },
      { label: "Каркас", value: "ДСП (ЛДСП)" },
      { label: "Наполнитель", value: "Пенополиуретан" },
      { label: "Обивка", value: "Рогожка" },
      { label: "Механизм", value: "Еврокнижка" },
      { label: "Габариты дивана", value: "195 × 80 × 78 см" },
      { label: "Спальное место", value: "130 × 195 см" },
      { label: "Бельевой ящик", value: "150 × 26 × 50 см" },
      { label: "Глубина сиденья", value: "48 см" },
      { label: "Глубина сиденья без подушек", value: "66 см" },
      { label: "Высота сиденья", value: "41 см" },
      { label: "Ширина сиденья", value: "195 см" },
      { label: "Высота спинки", value: "29 см" },
      { label: "Высота ножек", value: "4 см" },
      { label: "Подушки спинки", value: "2 шт, 70 × 46 × 18 см" },
      { label: "Декоративные подушки", value: "2 шт, 63 × 26 × 10 см" },
      { label: "Упаковка (1 коробка)", value: "195 × 50 × 70 см, 44 кг" },
      { label: "Максимальная нагрузка", value: "100 кг" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },

  {
    id: 10, name: "Атланта", category: "sofa", price: 16999, img: ATLANTA_HONEY_FRONT,
    angleType: "прямой", fabric: "рогожка", createdAt: 0,
    images: [ATLANTA_HONEY_FRONT, ATLANTA_HONEY_ANGLE, ATLANTA_HONEY_BED, ATLANTA_HONEY_STORAGE, ATLANTA_HONEY_BACK],
    colors: [
      { name: "Бежевый", swatch: ATLANTA_FRONT, images: [ATLANTA_FRONT, ATLANTA_ANGLE, ATLANTA_BED, ATLANTA_STORAGE, ATLANTA_BACK] },
      { name: "Кофейный", swatch: ATLANTA_COFFEE_FRONT, images: [ATLANTA_COFFEE_FRONT, ATLANTA_COFFEE_ANGLE, ATLANTA_COFFEE_BED, ATLANTA_COFFEE_STORAGE, ATLANTA_COFFEE_BACK] },
      { name: "Медово-коричневый", swatch: ATLANTA_HONEY_FRONT, images: [ATLANTA_HONEY_FRONT, ATLANTA_HONEY_ANGLE, ATLANTA_HONEY_BED, ATLANTA_HONEY_STORAGE, ATLANTA_HONEY_BACK] },
      { name: "Серый", swatch: ATLANTA_GREY_FRONT, images: [ATLANTA_GREY_FRONT, ATLANTA_GREY_ANGLE, ATLANTA_GREY_BED, ATLANTA_GREY_STORAGE, ATLANTA_GREY_BACK] },
      { name: "Синий", swatch: ATLANTA_BLUE_FRONT, images: [ATLANTA_BLUE_FRONT, ATLANTA_BLUE_ANGLE, ATLANTA_BLUE_BED, ATLANTA_BLUE_STORAGE, ATLANTA_BLUE_BACK] },
    ],
    desc: "Прямой диван-кровать с деревянными подлокотниками и вместительным ящиком для хранения. Механизм еврокнижка, обивка — рогожка. Отличное решение для гостиной или спальни.",
    specs: [
      { label: "Тип", value: "Прямой диван-кровать" },
      { label: "Механизм", value: "Еврокнижка" },
      { label: "Основа сиденья", value: "ДСП (ЛДСП)" },
      { label: "Каркас", value: "ДСП (ЛДСП)" },
      { label: "Наполнитель", value: "Пенополиуретан" },
      { label: "Материал обивки", value: "Рогожка" },
      { label: "Материал ножек", value: "Пластмасса" },
      { label: "Габариты дивана", value: "226 × 87 × 79 см" },
      { label: "Спальное место", value: "194 × 132 см" },
      { label: "Глубина сиденья", value: "54,5 см" },
      { label: "Глубина сиденья без подушек", value: "70 см" },
      { label: "Высота сиденья", value: "40 см" },
      { label: "Ширина сиденья", value: "194 см" },
      { label: "Высота спинки", value: "41 см" },
      { label: "Высота ножек", value: "4 см" },
      { label: "Ящик для белья", value: "192 × 26 × 54 см" },
      { label: "Подушки спинки", value: "3 шт, 65 × 15,5 × 48 см" },
      { label: "Упаковка (коробка 1)", value: "175 × 50 × 71 см — 52 кг" },
      { label: "Упаковка (коробка 2)", value: "80 × 33 × 64 см — 17,5 кг" },
      { label: "Максимальная нагрузка", value: "100 кг" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },

  {
    id: 11, name: "Рейн угловой", category: "sofa", price: 17999, img: REIN_GREY_FRONT,
    angleType: "угловой", fabric: "рогожка", createdAt: 0,
    images: [REIN_GREY_FRONT, REIN_GREY_ANGLE, REIN_GREY_STORAGE, REIN_GREY_BED],
    colors: [
      { name: "Бежевый", swatch: ROGOJKA_BEIGE, images: [REIN_FRONT, REIN_ANGLE, REIN_STORAGE, REIN_BED] },
      { name: "Кофейный", swatch: REIN_COFFEE_FRONT, images: [REIN_COFFEE_FRONT, REIN_COFFEE_ANGLE, REIN_COFFEE_STORAGE, REIN_COFFEE_BED] },
      { name: "Медово-коричневый", swatch: REIN_HONEY_FRONT, images: [REIN_HONEY_FRONT, REIN_HONEY_ANGLE, REIN_HONEY_STORAGE, REIN_HONEY_BED] },
      { name: "Серый", swatch: REIN_GREY_FRONT, images: [REIN_GREY_FRONT, REIN_GREY_ANGLE, REIN_GREY_STORAGE, REIN_GREY_BED] },
      { name: "Синий", swatch: REIN_BLUE_FRONT, images: [REIN_BLUE_FRONT, REIN_BLUE_ANGLE, REIN_BLUE_STORAGE, REIN_BLUE_BED] },
    ],
    desc: "Угловой диван-кровать с механизмом «дельфин» и вместительным ящиком для хранения. Обивка — рогожка, российское производство. Универсальный угол — подойдёт для любой планировки.",
    specs: [
      { label: "Тип", value: "Угловой диван-кровать" },
      { label: "Механизм", value: "Дельфин" },
      { label: "Основа сиденья", value: "Ламели" },
      { label: "Каркас", value: "Металл" },
      { label: "Наполнитель", value: "Пенополиуретан" },
      { label: "Материал обивки", value: "Рогожка" },
      { label: "Производство", value: "Российское" },
      { label: "Тип угла", value: "Универсальный" },
      { label: "Ящик для белья", value: "Есть (138 × 22,5 × 65 см)" },
      { label: "Габариты дивана", value: "241 × 89 × 153 см" },
      { label: "Спальное место", value: "141 × 204 см" },
      { label: "Глубина сиденья", value: "58 см" },
      { label: "Глубина сиденья без подушек", value: "78 см" },
      { label: "Высота сиденья", value: "42 см" },
      { label: "Ширина сиденья", value: "135 см" },
      { label: "Высота спинки", value: "25,1 см" },
      { label: "Высота подлокотников", value: "62 см" },
      { label: "Ширина подлокотников", value: "19 см" },
      { label: "Высота ножек", value: "5 см" },
      { label: "Подушки (3 шт)", value: "75 × 47 × 20 см" },
      { label: "Декоративные подушки (2 шт)", value: "38 × 38 × 10 см" },
      { label: "Упаковка (коробка 1)", value: "145 × 72 × 39 см — 33 кг" },
      { label: "Упаковка (коробка 2)", value: "137 × 81 × 46 см — 55 кг" },
      { label: "Упаковка (коробка 3)", value: "90 × 63 × 33 см — 23 кг" },
      { label: "Нагрузка на одно место", value: "До 90 кг" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },

  {
    id: 8, name: "Оазис", category: "garden", price: 12999, oldPrice: 16999, img: OASIS_2, tag: "Акция",
    angleType: "прямой", fabric: "рогожка", createdAt: 1,
    images: [OASIS_2, OASIS_3, OASIS_4, OASIS_5, OASIS_6, OASIS_IMAGE],
    colors: [
      { name: "Чёрный", swatch: OASIS_IMAGE },
    ],
    desc: "Комплект садовой мебели из искусственного ротанга. В комплекте диван, два кресла и журнальный столик. Подходит для террасы, балкона и сада.",
    specs: [
      { label: "Комплект", value: "Диван + 2 кресла + столик" },
      { label: "Материал", value: "Искусственный ротанг PE" },
      { label: "Каркас", value: "Металл с порошковым покрытием" },
      { label: "Подушки", value: "Влагостойкая ткань, входят в комплект" },
      { label: "Нагрузка", value: "До 150 кг на место" },
      { label: "Уход", value: "Протирать влажной тряпкой" },
      { label: "Срок изготовления", value: "До 7 рабочих дней" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },
  {
    id: 12,
    name: "Кадис",
    category: "sofa",
    price: 10099,
    img: KADIS_FRONT,
    angleType: "прямой",
    fabric: "рогожка",
    createdAt: 8,
    images: [KADIS_FRONT, KADIS_ANGLE, KADIS_STORAGE, KADIS_BED],
    colors: [
      {
        name: "Бежевый",
        swatch: KADIS_BEIGE_INTERIOR,
        images: [KADIS_FRONT, KADIS_ANGLE, KADIS_STORAGE, KADIS_BED, ROGOJKA_BEIGE, KADIS_BEIGE_INTERIOR],
      },
      {
        name: "Кофейный",
        swatch: KADIS_COFFEE_INTERIOR,
        images: [KADIS_COFFEE_FRONT, KADIS_COFFEE_ANGLE, KADIS_COFFEE_STORAGE, KADIS_COFFEE_BED, ROGOJKA_COFFEE, KADIS_COFFEE_INTERIOR],
      },
      {
        name: "Медово-коричневый",
        swatch: KADIS_HONEY_INTERIOR,
        images: [KADIS_HONEY_FRONT, KADIS_HONEY_ANGLE, KADIS_HONEY_STORAGE, KADIS_HONEY_BED, ROGOJKA_HONEY, KADIS_HONEY_INTERIOR],
      },
      {
        name: "Серый",
        swatch: KADIS_GREY_INTERIOR,
        images: [KADIS_GREY_FRONT, KADIS_GREY_ANGLE, KADIS_GREY_STORAGE, KADIS_GREY_BED, ROGOJKA_GREY, KADIS_GREY_INTERIOR],
      },
      {
        name: "Синий",
        swatch: KADIS_BLUE_INTERIOR,
        images: [KADIS_BLUE_FRONT, KADIS_BLUE_ANGLE, KADIS_BLUE_STORAGE, KADIS_BLUE_BED, ROGOJKA_BLUE, KADIS_BLUE_INTERIOR],
      },
    ],
    desc: "Компактный прямой диван-кровать из рогожки с ящиком для хранения постельного белья. Механизм трансформации — выкатной. Металлические хромированные ножки.",
    specs: [
      { label: "Габариты дивана", value: "147 × 76 × 67 см" },
      { label: "Ширина общая", value: "150 см" },
      { label: "Высота общая", value: "89 см" },
      { label: "Высота сиденья", value: "39 см" },
      { label: "Глубина сиденья", value: "73 см" },
      { label: "Спальное место", value: "190 × 73 см" },
      { label: "Ящик для белья", value: "110,4 × 25,5 × 65 см" },
      { label: "Размер подушек", value: "30 × 54 × 15 см (2 шт.)" },
      { label: "Основа сиденья", value: "ДСП (ЛДСП)" },
      { label: "Каркас", value: "ДСП (ЛДСП)" },
      { label: "Наполнитель", value: "ППУ + синтепон" },
      { label: "Обивка", value: "Рогожка" },
      { label: "Нагрузка на место", value: "До 90 кг" },
      { label: "Упаковка", value: "1 коробка 47 кг (140 × 74 × 42 см)" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },

  {
    id: 13, name: "Дубай", category: "sofa", price: 19999, img: DUBAI_HONEY_FRONT,
    angleType: "прямой", fabric: "рогожка", createdAt: 9,
    images: [
      "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/beb86743-2a34-47b6-806b-05235c128358.jpg",
      "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7d88e75e-ee9e-44d5-8cee-4987978826bb.jpg",
      "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/87c00535-a5fe-406d-9628-9c73ae329c05.jpg",
      "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/cfa2bf9a-f328-4098-a3e6-81b8539bbc8c.jpg",
    ],
    colors: [
      {
        name: "Бежевый",
        swatch: ROGOJKA_BEIGE,
        images: [
          "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/beb86743-2a34-47b6-806b-05235c128358.jpg",
          "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/7d88e75e-ee9e-44d5-8cee-4987978826bb.jpg",
          "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/87c00535-a5fe-406d-9628-9c73ae329c05.jpg",
          "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/cfa2bf9a-f328-4098-a3e6-81b8539bbc8c.jpg",
        ],
      },
      { name: "Кофейный", swatch: DUBAI_COFFEE_FRONT, images: [DUBAI_COFFEE_FRONT, DUBAI_COFFEE_ANGLE, DUBAI_COFFEE_BED, DUBAI_COFFEE_BACK] },
      { name: "Медово-коричневый", swatch: DUBAI_HONEY_FRONT, images: [DUBAI_HONEY_FRONT, DUBAI_HONEY_ANGLE, DUBAI_HONEY_BED, DUBAI_HONEY_BACK] },
      { name: "Серый", swatch: DUBAI_GREY_FRONT, images: [DUBAI_GREY_FRONT, DUBAI_GREY_ANGLE, DUBAI_GREY_BED, DUBAI_GREY_BACK] },
      { name: "Синий", swatch: DUBAI_BLUE_FRONT, images: [DUBAI_BLUE_FRONT, DUBAI_BLUE_ANGLE, DUBAI_BLUE_BED, DUBAI_BLUE_BACK] },
    ],
    desc: "Прямой диван-кровать с механизмом трёхсекционная еврокнижка и удобным карманом сбоку. Обивка — рогожка, латофлексная сборка с ППУ и синтепоном. Деревянные подлокотники. Отличное решение для гостиной.",
    specs: [
      { label: "Механизм", value: "Трёхсекционная еврокнижка" },
      { label: "Материал обивки", value: "Рогожка" },
      { label: "Карман", value: "Есть (сбоку)" },
      { label: "Наполнитель", value: "Латофлексная сборка, ППУ, синтепон, поролоновая крошка" },
      { label: "Габариты дивана", value: "180 × 94 × 110 см" },
      { label: "Спальное место", value: "140 × 200 см" },
      { label: "Глубина сиденья", value: "90 см" },
      { label: "Глубина сиденья без подушек", value: "110 см" },
      { label: "Высота сиденья", value: "44 см" },
      { label: "Ширина сиденья", value: "140 см" },
      { label: "Высота спинки", value: "33 см" },
      { label: "Высота ножек", value: "5 см" },
      { label: "Размер подушек (1 шт)", value: "70 × 50 × 20 см" },
      { label: "Упаковка (1 коробка, 91 кг)", value: "180 × 60 × 111 см" },
      { label: "Максимальная нагрузка на место", value: "100 кг" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },

  {
    id: 14,
    name: "Монца",
    category: "sofa",
    price: 0,
    img: MONZA_EMERALD_FRONT,
    angleType: "прямой",
    fabric: "велюр",
    createdAt: 10,
    images: [
      MONZA_EMERALD_FRONT,
      MONZA_EMERALD_ANGLE,
      MONZA_EMERALD_BED1,
      MONZA_EMERALD_BED2,
      MONZA_EMERALD_BACK,
    ],
    colors: [
      {
        name: "Изумрудный",
        swatch: MONZA_EMERALD_FRONT,
        images: [
          MONZA_EMERALD_FRONT,
          MONZA_EMERALD_ANGLE,
          MONZA_EMERALD_BED1,
          MONZA_EMERALD_BED2,
          MONZA_EMERALD_BACK,
        ],
      },
      {
        name: "Мятный",
        swatch: MONZA_MINT_FRONT,
        images: [
          MONZA_MINT_FRONT,
          MONZA_MINT_ANGLE,
          MONZA_MINT_BED1,
          MONZA_MINT_BED2,
          MONZA_MINT_BACK,
        ],
      },
      {
        name: "Светло-серый",
        swatch: MONZA_LGREY_FRONT,
        images: [
          MONZA_LGREY_FRONT,
          MONZA_LGREY_ANGLE,
          MONZA_LGREY_BED1,
          MONZA_LGREY_BED2,
          MONZA_LGREY_BACK,
        ],
      },
      {
        name: "Синий",
        swatch: MONZA_BLUE_FRONT,
        images: [
          MONZA_BLUE_FRONT,
          MONZA_BLUE_ANGLE,
          MONZA_BLUE_BED1,
          MONZA_BLUE_BED2,
          MONZA_BLUE_BACK,
        ],
      },
      { name: "Тёмно-серый", swatch: ROGOJKA_GREY },
      { name: "Шоколадный", swatch: VELVET_CHOCOLATE },
    ],
    desc: "Прямой диван-кровать Монца на механизме еврокнижка. Обивка из мягкого велюра, бельевой ящик для хранения. В комплекте 3 приспинные и 2 декоративные подушки.",
    specs: [
      { label: "Механизм", value: "Еврокнижка" },
      { label: "Материал обивки", value: "Велюр" },
      { label: "Бельевой ящик", value: "Есть" },
      { label: "Габариты дивана", value: "221 × 87 × 79 см" },
      { label: "Спальное место", value: "194 × 132 см" },
      { label: "Глубина сиденья", value: "70 см" },
      { label: "Высота сиденья", value: "45 см" },
      { label: "Ширина сиденья", value: "194 см" },
      { label: "Высота спинки", value: "30 см" },
      { label: "Размер ящика для белья", value: "191 × 12,8 × 54 см" },
      { label: "Приспинные подушки", value: "3 шт, 63 × 43 см" },
      { label: "Декоративные подушки", value: "2 шт, 30 × 28 см" },
      { label: "Максимальная нагрузка на место", value: "100 кг" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
  },

];

const faqItems = [
  { q: "Какой срок гарантии на мебель?", a: "На всю мебель — 18 месяцев. Гарантия распространяется на каркас, механизмы и обивку." },
  { q: "Какой срок изготовления товаров?", a: "До 7 рабочих дней." },
  { q: "Можно ли заказать диван, который есть в каталоге, но в другой ткани или в другом цвете?", a: "Нет, для заказа доступны только те модели, которые есть в каталоге. Поменять ткань/цвет/размеры под индивидуальный заказ мы не можем, у нас серийное производство." },
  { q: "Есть ли доставка?", a: "Нет, доставку мы не осуществляем. Только самовывоз." },
  { q: "Есть ли шоурум, где можно посмотреть диваны вживую?", a: "Да, наш шоурум находится в Ульяновске на Московском шоссе 9к2, ориентир Адреналин парк. Открыт ежедневно с 08:00 до 19:00." },
];

type CartItem = { id: number; name: string; price: number; img: string; qty: number };

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterAngle, setFilterAngle] = useState("all");
  const [filterFabric, setFilterFabric] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeRogojka, setActiveRogojka] = useState(0);
  const [activeVelvet, setActiveVelvet] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<(typeof catalogProducts)[0] | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [promoTimeLeft, setPromoTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => {
    const promoEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
    const tick = () => {
      const diff = promoEnd.getTime() - Date.now();
      if (diff <= 0) return;
      setPromoTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openProduct = (p: (typeof catalogProducts)[0]) => {
    setSelectedProduct(p);
    setActivePhoto(0);
    setActiveColor(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const firstColorImages = (p.colors[0] as any)?.images as string[] | undefined;
    setActiveImages(firstColorImages ?? p.images);
  };
  const closeProduct = () => {
    setSelectedProduct(null);
    setActivePhoto(0);
    setActiveColor(0);
  };

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const navigate = (s: Section) => {
    setActiveSection(s);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: (typeof catalogProducts)[0]) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));

  const filteredProducts = (() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const list = catalogProducts.filter((p: any) => {
      if (activeFilter !== "all" && p.category !== activeFilter) return false;
      if (filterAngle !== "all" && p.angleType !== filterAngle) return false;
      if (filterFabric !== "all" && p.fabric !== filterFabric) return false;
      return true;
    }) as typeof catalogProducts;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = list as any[];
    if (sortOrder === "price_asc") s.sort((a, b) => a.price - b.price);
    else if (sortOrder === "price_desc") s.sort((a, b) => b.price - a.price);
    else if (sortOrder === "name_az") s.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    else if (sortOrder === "name_za") s.sort((a, b) => b.name.localeCompare(a.name, "ru"));
    else if (sortOrder === "new_first") s.sort((a, b) => a.createdAt - b.createdAt);
    else if (sortOrder === "old_first") s.sort((a, b) => b.createdAt - a.createdAt);
    return s as typeof catalogProducts;
  })();

  const navLinks: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О нас" },
    { id: "contacts", label: "Контакты" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} className="font-display text-2xl font-bold tracking-widest text-primary">
            Мебель за стеклом
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`font-body text-sm tracking-wider uppercase transition-colors ${
                  activeSection === link.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("cart")}
              className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-display tracking-widest hover:opacity-90 transition-opacity"
            >
              <Icon name="ShoppingBag" size={16} />
              <span className="hidden sm:inline">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-1" onClick={() => setMobileMenuOpen((v) => !v)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`block w-full text-left px-6 py-4 font-display tracking-widest uppercase text-sm border-b border-border ${
                  activeSection === link.id ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ====== HOME ====== */}
        {activeSection === "home" && (
          <div>
            {/* Hero */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
              <div className="relative container pb-20 animate-fade-up">
                <div className="max-w-2xl">
                  <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-4">Мебель нового поколения</p>
                  <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-6 text-foreground">
                    ФОРМА.<br />СТИЛЬ.<br />
                    <span className="text-accent">КОМФОРТ.</span>
                  </h1>
                  <p className="font-body text-muted-foreground text-lg mb-10 max-w-md">
                    Мягкая и садовая мебель, текстиль.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <button
                      onClick={() => navigate("catalog")}
                      className="bg-primary text-primary-foreground px-8 py-4 font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
                    >
                      Смотреть каталог
                    </button>
                    <button
                      onClick={() => navigate("contacts")}
                      className="border border-foreground/30 text-foreground px-8 py-4 font-display text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
                    >
                      Связаться с нами
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute top-32 right-8 hidden lg:flex flex-col gap-4 animate-fade-in delay-500">
                {[
                  { num: "1 млн+", label: "Довольных клиентов" },
                  { num: "18 мес.", label: "Гарантия" },
                  { num: "120+", label: "Моделей" },
                ].map((s, i) => (
                  <div key={i} className="bg-background/80 backdrop-blur border border-border px-5 py-3 text-right">
                    <div className="font-display text-2xl font-bold text-accent">{s.num}</div>
                    <div className="font-body text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Marquee */}
            <div className="bg-primary py-3 overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {Array(10).fill(null).map((_, i) => (
                  <span key={i} className="font-display text-primary-foreground text-sm tracking-[0.4em] uppercase font-light">
                    ДИВАНЫ · САДОВАЯ МЕБЕЛЬ · ВЕЛЮР · РОГОЖКА · ГАРАНТИЯ 18 МЕСЯЦЕВ ·&nbsp;
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <section className="container py-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: "Layers", title: "Качественные материалы", desc: "Велюр и рогожка — износостойкие ткани с богатой палитрой оттенков" },
                  { icon: "Clock", title: "Срок изготовления до 7 дней", desc: "Изготавливаем под заказ из каталога — всё, что видите, доступно для заказа" },
                  { icon: "ShieldCheck", title: "Гарантия 18 месяцев", desc: "Гарантия на каркас, механизмы и обивку. Ремонт или замена без лишних вопросов" },
                ].map((f, i) => (
                  <div key={i} className="border border-border p-8 hover:border-primary transition-colors group">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon name={f.icon as "Layers"} size={22} className="text-primary" />
                    </div>
                    <h3 className="font-display text-xl tracking-wide mb-3">{f.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Promo of the Month */}
            <section className="relative overflow-hidden bg-[#1a1a1a] text-white">
              <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "24px 24px" }} />
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="container relative z-10 py-20">
                <div style={{display:"flex", flexDirection:"column"}}>
                  {/* 1. Название */}
                  <div style={{marginBottom:"2rem"}}>
                    <div style={{display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"2rem"}}>
                      <div style={{width:"8px", height:"8px", borderRadius:"50%", background:"var(--primary)"}} />
                      <span className="font-display text-lg tracking-[0.3em] uppercase text-white font-bold">АКЦИЯ</span>
                    </div>
                    <h2 className="font-display text-5xl font-bold leading-none tracking-tight" style={{marginBottom:"1rem"}}>
                      САДОВАЯ<br />МЕБЕЛЬ<br />
                      <span className="text-white/60">«ОАЗИС»</span>
                    </h2>
                    <p className="font-body text-white/50 text-sm tracking-widest uppercase">Комплект: диван + 2 кресла + столик</p>
                  </div>
                  {/* 2. Цена */}
                  <div style={{display:"flex", alignItems:"flex-end", gap:"1.25rem", marginBottom:"2rem"}}>
                    <span className="font-display font-bold text-white" style={{fontSize:"3.5rem", lineHeight:1}}>12 999 ₽</span>
                    <div style={{marginBottom:"0.5rem"}}>
                      <span className="font-body text-white/30 line-through text-2xl block">16 999 ₽</span>
                      <span className="font-display text-accent text-sm tracking-widest">−24%</span>
                    </div>
                  </div>
                  {/* 3. Фото */}
                  <div style={{marginBottom:"2rem", position:"relative", overflow:"hidden", aspectRatio:"4/3"}}>
                    <img src={OASIS_IMAGE} alt="Оазис" style={{width:"100%", height:"100%", objectFit:"cover"}} />
                    <div style={{position:"absolute", top:"1rem", right:"1rem", background:"var(--primary)", color:"var(--primary-foreground)", fontSize:"0.75rem", letterSpacing:"0.3em", textTransform:"uppercase", padding:"0.5rem 1rem"}}>−24%</div>
                  </div>
                  {/* 4. Таймер */}
                  <div style={{marginBottom:"2.5rem"}}>
                    <p className="font-display uppercase text-white/25" style={{fontSize:"9px", letterSpacing:"0.5em", marginBottom:"1rem"}}>Акция заканчивается через</p>
                    <div style={{display:"flex", alignItems:"flex-end", gap:"0.25rem"}}>
                      {[
                        { val: promoTimeLeft.d, label: "дней" },
                        { val: promoTimeLeft.h, label: "часов" },
                        { val: promoTimeLeft.m, label: "минут" },
                        { val: promoTimeLeft.s, label: "секунд" },
                      ].map((t, i) => (
                        <div key={i} style={{display:"flex", alignItems:"flex-end", gap:"0.25rem"}}>
                          <div style={{textAlign:"center"}}>
                            <div className="font-display font-bold tabular-nums" style={{fontSize:"2.5rem", lineHeight:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", padding:"0.5rem 0.75rem", minWidth:"64px", textAlign:"center"}}>
                              {String(t.val).padStart(2, "0")}
                            </div>
                            <div className="font-body uppercase text-white/25" style={{fontSize:"9px", letterSpacing:"0.15em", marginTop:"0.5rem"}}>{t.label}</div>
                          </div>
                          {i < 3 && <span className="font-display text-white/20" style={{fontSize:"1.875rem", marginBottom:"0.75rem", marginLeft:"0.125rem", marginRight:"0.125rem"}}>:</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* 5. Кнопка */}
                  <button
                    onClick={() => { setActiveSection("catalog"); openProduct(catalogProducts.find(p => p.id === 8)!); }}
                    style={{display:"inline-flex", alignItems:"center", gap:"0.75rem", border:"1px solid rgba(255,255,255,0.3)", color:"white", fontSize:"0.75rem", letterSpacing:"0.3em", textTransform:"uppercase", padding:"1rem 2rem", background:"transparent", cursor:"pointer"}}
                  >
                    Воспользоваться акцией
                    <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
            </section>

            {/* Materials */}
            {(() => {
              const rogojkaColors = [
                { name: "Бежевый", color: "#C8B89A", dark: false, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/a389bbba-23dd-4b56-899d-d2317ab26cee.jpg" },
                { name: "Кофейный", color: "#3D2B1F", dark: true, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/f1b9a482-58b8-46af-857c-4847ef4e3917.jpg" },
                { name: "Медово-коричневый", color: "#7A6E60", dark: true, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/985b83d3-f532-4f91-81af-58a255e5db43.jpg" },
                { name: "Серый", color: "#4A4A4A", dark: true, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/334bb3de-ee3c-4dec-a59a-f195d0648310.jpg" },
                { name: "Синий", color: "#2E4A6B", dark: true, image: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/46919192-f2f6-4f7b-a677-abb571901185.jpg" },
              ];
              const velvetColors = [
                { name: "Изумрудный", color: "#2E6B50", image: VELVET_EMERALD },
                { name: "Шоколадный", color: "#6B4A35", image: VELVET_CHOCOLATE },
                { name: "Мятный", color: "#4A8B7F", image: VELVET_MINT },
                { name: "Светло-серый", color: "#9E9E9E", image: VELVET_LGREY },
                { name: "Синий", color: "#3A5A8A", image: VELVET_BLUE },
              ];
              const rActive = rogojkaColors[activeRogojka];
              const vActive = velvetColors[activeVelvet];
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const rImg = (rActive as any).image as string;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const vImg = (vActive as any).image as string;
              return (
                <section className="border-y border-border overflow-hidden">
                  {/* Header */}
                  <div className="bg-card py-14 text-center border-b border-border">
                    <p className="font-body text-accent text-xs tracking-[0.4em] uppercase mb-3">Обивка</p>
                    <h2 className="font-display text-5xl md:text-6xl font-bold">МАТЕРИАЛЫ</h2>
                    <p className="font-body text-muted-foreground text-sm mt-4 max-w-sm mx-auto">Нажмите на цвет — и увидите, как ткань выглядит вживую</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

                    {/* ── РОГОЖКА ── */}
                    <div
                      className="relative flex flex-col overflow-hidden"
                      style={{ backgroundColor: rActive.color }}
                    >
                      {/* Real fabric photo background */}
                      <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                          backgroundImage: `url("${rImg}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {/* Dark overlay for readability */}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)" }} />

                      <div className="relative z-10 flex flex-col h-full p-10 lg:p-14 text-white">
                        <div className="flex items-start justify-between mb-auto pb-8">
                          <div>
                            <span className="font-body text-xs tracking-[0.35em] uppercase block mb-3 text-white/50"></span>
                            <h3 className="font-display text-7xl font-bold leading-none tracking-tight whitespace-nowrap">РОГОЖКА</h3>
                          </div>
                          <div className="border border-white/30 text-white/70 font-display text-xs tracking-widest px-3 py-1.5">
                            БАЗОВАЯ
                          </div>
                        </div>

                        <div className="mt-auto">
                          <p className="font-body text-sm leading-relaxed mb-8 max-w-xs text-white/60">
                            Плотное структурное переплетение нитей. Устойчива к истиранию, не скатывается, легко чистится.
                          </p>
                          <p className="font-display text-[10px] tracking-[0.4em] uppercase mb-4 text-white/40">
                            {rogojkaColors[activeRogojka].name} — выберите цвет
                          </p>
                          <div className="flex gap-2.5">
                            {rogojkaColors.map((c, i) => (
                              <button
                                key={c.name}
                                onClick={() => setActiveRogojka(i)}
                                title={c.name}
                                className="relative transition-all duration-200 overflow-hidden"
                                style={{ width: i === activeRogojka ? 56 : 40, height: 40 }}
                              >
                                <div
                                  className="w-full h-full border-2 transition-all duration-200"
                                  style={{
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    backgroundImage: `url("${(c as any).image}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderColor: i === activeRogojka ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                                    boxShadow: i === activeRogojka ? "0 2px 12px rgba(0,0,0,0.5)" : "none",
                                  }}
                                />
                                {i === activeRogojka && (
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── ВЕЛЮР ── */}
                    <div
                      className="relative flex flex-col overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20"
                      style={{ backgroundColor: vActive.color }}
                    >
                      {/* Real fabric photo background */}
                      <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                          backgroundImage: `url("${vImg}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)" }} />

                      <div className="relative z-10 flex flex-col h-full p-10 lg:p-14 text-white">
                        <div className="flex items-start justify-between mb-auto pb-8">
                          <div>
                            <span className="font-body text-xs tracking-[0.35em] uppercase block mb-3 text-white/40"></span>
                            <h3 className="font-display text-7xl font-bold leading-none tracking-tight whitespace-nowrap">ВЕЛЮР</h3>
                          </div>
                          <div className="border border-white/25 text-white/60 font-display text-xs tracking-widest px-3 py-1.5">
                            PREMIUM
                          </div>
                        </div>

                        <div className="mt-auto">
                          <p className="font-body text-sm leading-relaxed mb-8 max-w-xs text-white/55">
                            Короткий мягкий ворс с эффектом глубины цвета. Приятен на ощупь, переливается при смене угла света.
                          </p>
                          <p className="font-display text-[10px] tracking-[0.4em] uppercase mb-4 text-white/35">
                            {velvetColors[activeVelvet].name} — выберите оттенок
                          </p>
                          <div className="flex gap-2.5">
                            {velvetColors.map((c, i) => (
                              <button
                                key={c.name}
                                onClick={() => setActiveVelvet(i)}
                                title={c.name}
                                className="relative transition-all duration-200"
                                style={{ width: i === activeVelvet ? 56 : 40, height: 40 }}
                              >
                                <div
                                  className="w-full h-full border-2 transition-all duration-200"
                                  style={{
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    backgroundImage: `url("${(c as any).image}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderColor: i === activeVelvet ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                                    boxShadow: i === activeVelvet ? "0 2px 12px rgba(0,0,0,0.5)" : "none",
                                  }}
                                />
                                {i === activeVelvet && (
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border-t border-border px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-body text-sm text-muted-foreground">Хотите увидеть образцы вживую? Приезжайте в шоурум.</p>
                    <button onClick={() => navigate("contacts")} className="bg-primary text-primary-foreground px-6 py-3 font-display text-sm tracking-widest uppercase whitespace-nowrap hover:opacity-90 transition-opacity">
                      Записаться
                    </button>
                  </div>
                </section>
              );
            })()}

            {/* Catalog preview */}
            <section className="container py-24">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-2">Популярное</p>
                  <h2 className="font-display text-5xl font-bold cursor-pointer hover:text-primary transition-colors" onClick={() => navigate("catalog")}>КАТАЛОГ</h2>
                </div>
                <button onClick={() => navigate("catalog")} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors tracking-wider">
                  Все модели →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { p: catalogProducts[0], label: "Диваны", filter: "sofa", heroImg: LIBERTY_INTERIOR },
                  { p: catalogProducts[1], label: "Садовая мебель", filter: "garden", heroImg: FARELL_INTERIOR },
                  { p: catalogProducts[2], label: "Кровати", filter: "bed", heroImg: "https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/5eda887c-89c3-416b-b309-832f244149bf.jpg" },
                ].map(({ p, label, filter, heroImg }) => (
                  <div key={p.id} className="group">
                    <div className="aspect-[4/3] overflow-hidden relative mb-4 cursor-pointer" onClick={() => openProduct(p)}>
                      <img src={heroImg} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-background/90 backdrop-blur px-6 py-3 font-display text-sm tracking-widest uppercase border border-border">
                          Подробнее →
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <button
                          className="font-display text-xl tracking-widest hover:text-primary transition-colors"
                          onClick={() => { setActiveFilter(filter); navigate("catalog"); }}
                        >{label}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Garden banner */}
            <section className="relative h-[50vh] overflow-hidden">
              <img src={GARDEN_IMAGE} className="w-full h-full object-cover" alt="Садовая мебель" />
              <div className="absolute inset-0 bg-background/60" />
              <div className="absolute inset-0 flex items-center">
                <div className="container">
                  <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Новая коллекция</p>
                  <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">САДОВАЯ<br />МЕБЕЛЬ</h2>
                  <button
                    onClick={() => { setActiveFilter("garden"); navigate("catalog"); }}
                    className="border border-primary text-primary px-8 py-3 font-display tracking-widest text-sm uppercase hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Смотреть коллекцию
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ====== CATALOG ====== */}
        {activeSection === "catalog" && (
          <div className="container py-16">
            <div className="mb-12">
              <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Вся коллекция</p>
              <h1 className="font-display text-6xl font-bold">КАТАЛОГ</h1>
            </div>

            {/* Категории */}
            <div className="flex gap-3 mb-6 flex-wrap">
              {[{ id: "all", label: "Все модели" }, { id: "sofa", label: "Диваны" }, { id: "chair", label: "Кресла" }, { id: "bed", label: "Кровати" }, { id: "garden", label: "Садовая мебель" }].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-5 py-2 font-display text-sm tracking-widest uppercase transition-all ${
                    activeFilter === f.id ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Фильтры */}
            <div className="flex gap-4 mb-10 flex-wrap items-center border-t border-border pt-6">
              {/* Тип угла */}
              <div className="flex items-center gap-2">
                <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">Тип:</span>
                <div className="flex gap-1.5">
                  {[{ id: "all", label: "Все" }, { id: "прямой", label: "Прямые" }, { id: "угловой", label: "Угловые" }].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilterAngle(f.id)}
                      className={`px-3 py-1.5 font-body text-xs tracking-wide transition-all border ${
                        filterAngle === f.id ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ткань */}
              <div className="flex items-center gap-2">
                <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">Ткань:</span>
                <div className="flex gap-1.5">
                  {[{ id: "all", label: "Все" }, { id: "рогожка", label: "Рогожка" }, { id: "велюр", label: "Велюр" }].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilterFabric(f.id)}
                      className={`px-3 py-1.5 font-body text-xs tracking-wide transition-all border ${
                        filterFabric === f.id ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Сортировка */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">Порядок:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-border bg-background text-foreground font-body text-xs px-3 py-1.5 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="default">По умолчанию</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                  <option value="name_az">Название: А–Я</option>
                  <option value="name_za">Название: Я–А</option>
                  <option value="new_first">Сперва новые</option>
                  <option value="old_first">Сперва старые</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer" onClick={() => openProduct(p)}>
                  <div className="aspect-[4/3] overflow-hidden relative mb-4">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {p.tag && (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 font-display text-xs tracking-widest">{p.tag}</div>
                    )}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-background/90 backdrop-blur px-6 py-3 font-display text-sm tracking-widest uppercase border border-border">
                        Подробнее →
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-xl tracking-widest">{p.name}</h3>
                      <p className="font-body text-muted-foreground text-sm mt-1">{p.category === "sofa" ? "Диван" : p.category === "bed" ? "Кровать" : p.category === "chair" ? "Кресло" : "Садовая мебель"}</p>
                    </div>
                    <div className="text-right">
                      {"oldPrice" in p && p.oldPrice && (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        <div className="font-body text-muted-foreground line-through text-sm">{(p as any).oldPrice.toLocaleString("ru")} ₽</div>
                      )}
                      <div className="font-display text-xl text-primary">{p.price > 0 ? `${p.price.toLocaleString("ru")} ₽` : "Цена по запросу"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ====== ABOUT ====== */}
        {activeSection === "about" && (
          <div>
            <div className="relative h-[50vh] overflow-hidden">
              <img src="https://cdn.poehali.dev/projects/8bb3cf44-af11-4940-9528-eeab21c91f93/bucket/2b5d281a-cbc5-4293-a05d-6f95d0dcb8c9.jpg" className="w-full h-full object-cover" alt="О нас" />
              <div className="absolute inset-0 bg-background/70" />
              <div className="absolute inset-0 flex items-end container pb-16">
                <div>
                  <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Наша история</p>
                  <h1 className="font-display text-6xl md:text-8xl font-bold">О НАС</h1>
                </div>
              </div>
            </div>
            <div className="container py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
                <div>
                  <h2 className="font-display text-4xl font-bold mb-6">Мы создаём мебель<br /><span className="text-primary">с характером</span></h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-4">
                    Стабильно находимся на рынке уже более 10 лет, соответственно, имеем большой опыт работы. Мы знаем, как сделать лучше, красивее и удобнее.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed mb-4">
                    Мы уже добились рекордно низкой по мировым меркам себестоимости продукции, а также качества и объемов производства уровня мировых лидеров.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    У нас запущен полный цикл производства от нити до готового изделия, а значит мы уверены в том, что делаем.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "10 лет", label: "На рынке" },
                    { num: "1 млн+", label: "Клиентов" },
                    { num: "100+", label: "Моделей" },
                    { num: "18 мес.", label: "Гарантия" },
                  ].map((s, i) => (
                    <div key={i} className="border border-border p-6">
                      <div className="font-display text-4xl font-bold text-primary mb-2">{s.num}</div>
                      <div className="font-body text-muted-foreground text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full aspect-video">
                <iframe
                  src="https://vkvideo.ru/video_ext.php?oid=665766586&id=456239028&hd=2"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* ====== CONTACTS ====== */}
        {activeSection === "contacts" && (
          <div className="container py-20">
            <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Свяжитесь с нами</p>
            <h1 className="font-display text-6xl font-bold mb-16">КОНТАКТЫ</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                {[
                  { icon: "MapPin", title: "Шоурум", info: "г. Ульяновск, Московское шоссе 9к2\n(ориентир Адреналин парк)\nКаждый день: 08:00–19:00" },
                  { icon: "Phone", title: "Телефон", info: "+7 (842) 230-36-80" },
                  { icon: "Mail", title: "Email", info: "info@vmm24.com" },
                ].map((c, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon as "MapPin"} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-display tracking-widest text-sm uppercase mb-1">{c.title}</div>
                      <div className="font-body text-muted-foreground text-sm whitespace-pre-line">{c.info}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border border-border p-8">
                <h2 className="font-display text-2xl tracking-widest mb-6">НАПИСАТЬ НАМ</h2>
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-widest uppercase block mb-2">Ваше имя</label>
                    <input className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-widest uppercase block mb-2">Телефон</label>
                    <input className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors" placeholder="+7 (999) 000-00-00" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-widest uppercase block mb-2">Сообщение</label>
                    <textarea rows={4} className="w-full bg-secondary border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Расскажите, что вас интересует..." />
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-4 font-display tracking-widest uppercase text-sm hover:opacity-90 transition-opacity">
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====== FAQ ====== */}
        {activeSection === "faq" && (
          <div className="container py-20 max-w-3xl">
            <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Вопросы и ответы</p>
            <h1 className="font-display text-6xl font-bold mb-16">FAQ</h1>
            <div className="space-y-2">
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                    <span className="font-display tracking-wide">{item.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={18}
                      className={`flex-shrink-0 ml-4 transition-colors ${openFaq === i ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 animate-fade-in">
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-16 border border-primary/30 bg-primary/5 p-8 text-center">
              <h3 className="font-display text-2xl mb-3">Не нашли ответ?</h3>
              <p className="font-body text-muted-foreground mb-6">Напишите нам</p>
              <button onClick={() => navigate("contacts")} className="bg-primary text-primary-foreground px-8 py-3 font-display tracking-widest text-sm uppercase hover:opacity-90 transition-opacity">
                Связаться с нами
              </button>
            </div>
          </div>
        )}

        {/* ====== CART ====== */}
        {activeSection === "cart" && (
          <div className="container py-20">
            <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-3">Выбранное</p>
            <h1 className="font-display text-6xl font-bold mb-16">КОРЗИНА</h1>
            {cartItems.length === 0 ? (
              <div className="text-center py-24 border border-border">
                <Icon name="ShoppingBag" size={64} className="text-muted-foreground mx-auto mb-6" />
                <h3 className="font-display text-3xl mb-3">Корзина пуста</h3>
                <p className="font-body text-muted-foreground mb-8">Добавьте товары из каталога</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button onClick={() => navigate("catalog")} className="bg-primary text-primary-foreground px-8 py-3 font-display tracking-widest text-sm uppercase">В каталог</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border border-border p-4 flex gap-4 animate-fade-in">
                      <img src={item.img} alt={item.name} className="w-24 h-20 object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-display tracking-widest mb-1">{item.name}</div>
                        <div className="font-display text-primary">{item.price.toLocaleString("ru")} ₽</div>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary transition-colors">
                            <Icon name="Minus" size={14} />
                          </button>
                          <span className="font-display text-lg w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary transition-colors">
                            <Icon name="Plus" size={14} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                        <Icon name="X" size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border border-border p-6 h-fit sticky top-24">
                  <h3 className="font-display text-xl tracking-widest mb-6">ИТОГО</h3>
                  <div className="space-y-3 mb-6 font-body text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Товаров</span><span>{totalItems} шт.</span>
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-display tracking-widest">Итого</span>
                      <span className="font-display text-xl text-primary">{totalPrice.toLocaleString("ru")} ₽</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-4 font-display tracking-widest uppercase text-sm hover:opacity-90 transition-opacity">
                    Оформить заказ
                  </button>
                  <button onClick={() => navigate("catalog")} className="w-full mt-3 border border-border text-muted-foreground py-3 font-display tracking-widest uppercase text-xs hover:border-primary hover:text-primary transition-colors">
                    Продолжить покупки
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <footer className="border-t border-border mt-20 py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
              <div>
                <div className="font-display text-2xl text-primary tracking-widest mb-3">Мебель за стеклом</div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">Диваны и садовая мебель с гарантией 18 месяцев.</p>
              </div>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Разделы</div>
                <ul className="space-y-2">
                  {navLinks.map((l) => (
                    <li key={l.id}>
                      <button onClick={() => navigate(l.id)} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Контакты</div>
                <ul className="space-y-2">
                  {["+7 (842) 230-36-80", "info@vmm24.com", "г. Ульяновск, Московское шоссе 9к2"].map((t, i) => (
                    <li key={i}>
                      <button onClick={() => navigate("contacts")} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors text-left">{t}</button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
            <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between gap-3">
              <p className="font-body text-xs text-muted-foreground">© 2024 FORMA. Все права защищены.</p>
              <p className="font-body text-xs text-muted-foreground">Политика конфиденциальности · Оферта</p>
            </div>
          </div>
        </footer>
      </main>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={closeProduct}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          <div
            className="relative z-10 w-full md:max-w-[92vw] lg:max-w-[1160px] md:mx-4 bg-background max-h-[95vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button onClick={closeProduct} className="absolute top-4 right-4 z-30 w-10 h-10 bg-background/90 backdrop-blur border border-border flex items-center justify-center hover:border-primary transition-colors">
              <Icon name="X" size={16} />
            </button>

            {/* ══ LEFT: Gallery — вертикальные миниатюры + большое фото ══ */}
            <div className="w-full md:w-[58%] flex-shrink-0 flex flex-row h-[280px] md:h-auto">

              {/* Вертикальный стрип миниатюр — только фотографии товара */}
              <div className="hidden md:flex flex-col gap-2 p-2 w-[88px] flex-shrink-0 overflow-y-auto border-r border-border bg-muted/10">
                {activeImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`w-full aspect-square flex-shrink-0 overflow-hidden border-2 transition-all ${i === activePhoto ? "border-primary" : "border-transparent opacity-55 hover:opacity-100 hover:border-border"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Большое фото */}
              <div className="relative flex-1 bg-muted/10 overflow-hidden flex items-center justify-center">
                <img
                  key={activePhoto}
                  src={activeImages[activePhoto]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain p-2 transition-opacity duration-300"
                />

                {/* Стрелки навигации */}
                {activeImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhoto((p) => (p - 1 + activeImages.length) % activeImages.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/85 backdrop-blur border border-border flex items-center justify-center hover:border-primary transition-colors"
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    <button
                      onClick={() => setActivePhoto((p) => (p + 1) % activeImages.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/85 backdrop-blur border border-border flex items-center justify-center hover:border-primary transition-colors"
                    >
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </>
                )}

                {/* Счётчик */}
                <div className="absolute bottom-2 right-3 bg-background/75 backdrop-blur px-2 py-0.5 font-display text-[11px] tracking-widest text-muted-foreground">
                  {activePhoto + 1} / {activeImages.length}
                </div>

                {/* Горизонтальные точки — только мобайл */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
                  {activeImages.map((_, i) => (
                    <button key={i} onClick={() => setActivePhoto(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === activePhoto ? "bg-primary scale-125" : "bg-border"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* ══ RIGHT: Info panel ══ */}
            <div className="flex flex-col flex-1 overflow-y-auto border-t md:border-t-0 md:border-l border-border">
              <div className="p-6 md:p-8 flex flex-col min-h-full">

                {/* Категория + тег */}
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-muted-foreground text-xs tracking-[0.35em] uppercase">
                    {selectedProduct.category === "sofa" ? "Диван" : selectedProduct.category === "bed" ? "Кровать" : selectedProduct.category === "chair" ? "Кресло" : "Садовая мебель"}
                  </p>
                  {selectedProduct.tag && (
                    <span className="bg-primary text-primary-foreground px-3 py-0.5 font-display text-xs tracking-widest">{selectedProduct.tag}</span>
                  )}
                </div>

                {/* Название */}
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-widest mb-2">{selectedProduct.name}</h2>

                {/* Цена */}
                <div className="font-display text-2xl text-primary mb-4">{selectedProduct.price > 0 ? `${selectedProduct.price.toLocaleString("ru")} ₽` : "Цена по запросу"}</div>

                {/* Описание */}
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5 pb-5 border-b border-border">{selectedProduct.desc}</p>

                {/* ── ВЫБОР ЦВЕТА ОБИВКИ — отдельный блок ── */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="mb-5 pb-5 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-display text-xs tracking-[0.35em] uppercase text-muted-foreground">Цвет обивки</p>
                      {activeColor !== null && (
                        <p className="font-body text-xs text-primary font-medium">{selectedProduct.colors[activeColor].name}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((c, i) => (
                        <button
                          key={i}
                          title={c.name}
                          onClick={() => {
                            setActiveColor(i);
                            setActivePhoto(0);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const colorImgs = (c as any).images as string[] | undefined;
                            setActiveImages(colorImgs ?? selectedProduct.images);
                          }}
                          className={`relative w-11 h-11 overflow-hidden transition-all duration-200 ${i === activeColor ? "ring-2 ring-primary ring-offset-2 scale-105" : "ring-1 ring-border hover:ring-primary/50 hover:scale-105"}`}
                        >
                          <img src={c.swatch} alt={c.name} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Характеристики */}
                <div className="mb-6 flex-1">
                  <p className="font-display text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">Характеристики</p>
                  <div>
                    {selectedProduct.specs.map((s, i) => (
                      <div key={i} className={`flex justify-between gap-4 py-2.5 text-sm ${i < selectedProduct.specs.length - 1 ? "border-b border-border/40" : ""}`}>
                        <span className="font-body text-muted-foreground flex-shrink-0">{s.label}</span>
                        <span className="font-body text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => { addToCart(selectedProduct); closeProduct(); }}
                  className="w-full bg-primary text-primary-foreground py-4 font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity mt-auto"
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}