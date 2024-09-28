import { FAKULTAS } from "./fakultas.constans";

type ProdiType = {
  [key: string]: { [key: string]: string };
};

export const PRODI: ProdiType = {
  [FAKULTAS.FS]: {
    SD: "Sains Data",
    BIO: "Biologi",
    KIM: "Kimia",
    FIS: "Fisika",
    MAT: "Matematika",
    SAT: "Sains Aktuaria",
    SAP: "Sains Atmosfer dan keplanetan",
    FAR: "Farmasi",
  },
  [FAKULTAS.FTI]: {
    IF: "Teknik Informatika",
    TEL: "Teknik Elektro",
    TTM: "Teknik Telekomunikasi",
    TI: "Teknik Industri",
    TMB: "Teknik Mesin",
  },
  [FAKULTAS.FTIK]: {
    TS: "Teknik Sipil",
    TK: "Teknik Kimia",
    TL: "Teknik Lingkungan",
    PWK: "Perencaan Wilayah dan Kota",
  },
};

export const PRODI_ARRAY = Object.keys(PRODI).reduce(
  (acc: { value: string; label: string }[], key) => {
    const prodiKeys = PRODI[key] ? Object.keys(PRODI[key]) : [];
    const prodiValues = prodiKeys.map((prodiKey) => ({
      value: prodiKey,
      label: PRODI[key]?.[prodiKey] || "",
    }));
    return [...acc, ...prodiValues];
  },
  []
);
