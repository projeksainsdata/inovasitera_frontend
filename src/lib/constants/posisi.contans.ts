export const POSISI = {
  KETUA_HIM: 'kahim',
  KESEKJENAN: 'sekjen',
  BENDAHARA: 'bendahara',
  Sekretaris: 'Sekretaris',
  KETUA_BALEG: 'kabaleg',
  SENATOR: 'Senator',
  KADEP: 'kadep',
  KADIV: 'kadiv',
  KAMIS: 'kamis',
  ANGGOTA: 'anggota',
};

export const POSISI_LABEL = {
  [POSISI.KETUA_HIM]: 'Ketua Himpunan',
  [POSISI.KESEKJENAN]: 'Sekretaris Jendral',
  [POSISI.BENDAHARA]: 'Bendahara',
  [POSISI.Sekretaris]: 'Sekretaris',
  [POSISI.KETUA_BALEG]: 'Ketua Baleg',
  [POSISI.SENATOR]: 'Senator',
  [POSISI.KADEP]: 'Kepala Departement',
  [POSISI.KADIV]: 'Kepala Divisi',
  [POSISI.KAMIS]: 'Kepala Komisi',
  [POSISI.ANGGOTA]: 'Anggota',
};

export const POSISI_ORDER = [
  POSISI.KETUA_HIM,
  POSISI.KETUA_BALEG,
  POSISI.SENATOR,
  POSISI.KESEKJENAN,
  POSISI.KADEP,
  POSISI.KAMIS,
  POSISI.KADIV,
  POSISI.Sekretaris,
  POSISI.BENDAHARA,
  POSISI.ANGGOTA,
];

export const POSISI_ORDER_LABEL: { label: string; value: string }[] =
  POSISI_ORDER.map((posisi) => ({
    label: POSISI_LABEL[posisi]!,
    value: posisi,
  }));
