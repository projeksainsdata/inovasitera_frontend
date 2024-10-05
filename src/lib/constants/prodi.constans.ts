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
    SAP: "Sains Atmosfer dan Keplanetan",
    FAR: "Farmasi",
    SLK: "Sains Lingkungan Kelautan",
    MFIS: "Magister Fisika"
  },
  [FAKULTAS.FTI]: {
    TEL: "Teknik Elektro",
    GEF: "Teknik Geofisika",
    IF: "Teknik Informatika",
    GEL: "Teknik Geologi",
    TMB: "Teknik Mesin",
    TI: "Teknik Industri",
    TK: "Teknik Kimia",
    TF: "Teknik Fisika",
    TBS: "Teknik Biosistem",
    TIP: "Teknologi Industri Pertanian",
    TP: "Teknologi Pangan",
    TSE: "Teknik Sistem Energi",
    TPM: "Teknik Pertambangan",
    TMA: "Teknik Material",
    TTM: "Teknik Telekomunikasi",
    RK: "Rekayasa Kehutanan",
    TBM: "Teknik Biomedik",
    RKOS: "Rekayasa Kosmetik",
    RMOG: "Rekayasa Minyak dan Gas",
    RIA: "Rekayasa Instrumentasi dan Automasi"
  },
  [FAKULTAS.FTIK]: {
    GMA: "Teknik Geomatika",
    PWK: "Perencanaan Wilayah dan Kota",
    TS: "Teknik Sipil",
    AR: "Arsitektur",
    TL: "Teknik Lingkungan",
    TKL: "Teknik Kelautan",
    DKV: "Desain Komunikasi Visual",
    AL: "Arsitektur Lanskap",
    TPKE: "Teknik Perkeretaapian",
    RTKA: "Rekayasa Tata Kelola Air Terpadu"
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
