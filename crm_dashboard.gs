// ============================================================
// CRM Pipeline Dashboard — Google Apps Script
// Kullanım: Apps Script editöründe açın → Çalıştır → createCRMDashboard
// ============================================================

// ── Ham veri (crm_pipeline.csv içeriği) ─────────────────────
const CSV_DATA = [
  ['firsat_id','musteri','satis_temsilcisi','bolge','urun','kaynak','asama','tutar_try','kazanma_olasiligi_yuzde','olusturma_tarihi','acik_gun'],
  ['OPP-1001','Müşteri 1','Elif Yılmaz','Marmara','Danışmanlık','Referral','Closed Won',43000,100,'2025-01-27',89],
  ['OPP-1002','Müşteri 2','Deniz Aydın','Marmara','ERP Lisans','Inbound','Negotiation',31000,70,'2025-02-25',32],
  ['OPP-1003','Müşteri 3','Deniz Aydın','Karadeniz','Entegrasyon','Referral','Qualification',115000,20,'2025-02-26',60],
  ['OPP-1004','Müşteri 4','Deniz Aydın','İç Anadolu','Danışmanlık','Inbound','Closed Won',186000,100,'2025-04-19',46],
  ['OPP-1005','Müşteri 5','Ayşe Kaya','Ege','ERP Lisans','Outbound','Proposal',31000,45,'2025-04-08',15],
  ['OPP-1006','Müşteri 6','Ayşe Kaya','İç Anadolu','Bakım/Destek','Inbound','Negotiation',145000,70,'2025-02-01',51],
  ['OPP-1007','Müşteri 7','Elif Yılmaz','Karadeniz','Eğitim','Web','Proposal',155000,45,'2025-02-19',11],
  ['OPP-1008','Müşteri 8','Elif Yılmaz','Ege','Danışmanlık','Inbound','Closed Won',229000,100,'2025-01-26',51],
  ['OPP-1009','Müşteri 9','Ayşe Kaya','Akdeniz','Danışmanlık','Outbound','Negotiation',102000,70,'2025-04-01',29],
  ['OPP-1010','Müşteri 10','Ayşe Kaya','Marmara','Entegrasyon','Referral','Negotiation',194000,70,'2025-03-04',23],
  ['OPP-1011','Müşteri 11','Burak Şahin','Akdeniz','Danışmanlık','Web','Proposal',183000,45,'2025-03-25',10],
  ['OPP-1012','Müşteri 12','Mehmet Demir','Marmara','Eğitim','Fuar','Closed Won',24000,100,'2025-02-24',75],
  ['OPP-1013','Müşteri 13','Ayşe Kaya','Ege','Bakım/Destek','Fuar','Closed Won',44000,100,'2025-03-09',20],
  ['OPP-1014','Müşteri 14','Mehmet Demir','Karadeniz','Bakım/Destek','Web','Negotiation',237000,70,'2025-05-30',54],
  ['OPP-1015','Müşteri 15','Ayşe Kaya','Ege','Entegrasyon','Referral','Closed Lost',134000,0,'2025-01-24',9],
  ['OPP-1016','Müşteri 16','Elif Yılmaz','Ege','Entegrasyon','Fuar','Negotiation',24000,70,'2025-04-09',51],
  ['OPP-1017','Müşteri 17','Deniz Aydın','Akdeniz','ERP Lisans','Web','Negotiation',182000,70,'2025-01-30',90],
  ['OPP-1018','Müşteri 18','Deniz Aydın','İç Anadolu','ERP Lisans','Outbound','Closed Won',83000,100,'2025-04-22',23],
  ['OPP-1019','Müşteri 19','Burak Şahin','Marmara','Entegrasyon','Outbound','Closed Lost',203000,0,'2025-02-15',67],
  ['OPP-1020','Müşteri 20','Elif Yılmaz','İç Anadolu','Entegrasyon','Web','Closed Won',58000,100,'2025-02-09',50],
  ['OPP-1021','Müşteri 21','Mehmet Demir','Karadeniz','ERP Lisans','Web','Closed Lost',161000,0,'2025-03-24',65],
  ['OPP-1022','Müşteri 22','Elif Yılmaz','Marmara','Danışmanlık','Outbound','Closed Lost',22000,0,'2025-03-03',75],
  ['OPP-1023','Müşteri 23','Elif Yılmaz','Marmara','Entegrasyon','Inbound','Closed Won',204000,100,'2025-02-02',19],
  ['OPP-1024','Müşteri 24','Burak Şahin','Karadeniz','Entegrasyon','Web','Qualification',116000,20,'2025-02-24',72],
  ['OPP-1025','Müşteri 25','Mehmet Demir','İç Anadolu','Bakım/Destek','Outbound','Proposal',238000,45,'2025-05-13',60],
  ['OPP-1026','Müşteri 26','Elif Yılmaz','Ege','ERP Lisans','Outbound','Proposal',158000,45,'2025-05-22',32],
  ['OPP-1027','Müşteri 27','Deniz Aydın','Ege','Danışmanlık','Inbound','Qualification',25000,20,'2025-01-09',45],
  ['OPP-1028','Müşteri 28','Elif Yılmaz','Karadeniz','Danışmanlık','Fuar','Proposal',146000,45,'2025-02-03',76],
  ['OPP-1029','Müşteri 29','Deniz Aydın','Akdeniz','Bakım/Destek','Fuar','Proposal',56000,45,'2025-01-25',15],
  ['OPP-1030','Müşteri 30','Burak Şahin','İç Anadolu','ERP Lisans','Fuar','Proposal',180000,45,'2025-01-26',10],
  ['OPP-1031','Müşteri 31','Burak Şahin','İç Anadolu','Danışmanlık','Inbound','Closed Won',57000,100,'2025-02-18',71],
  ['OPP-1032','Müşteri 32','Burak Şahin','Ege','Bakım/Destek','Outbound','Proposal',71000,45,'2025-01-20',59],
  ['OPP-1033','Müşteri 33','Deniz Aydın','Marmara','ERP Lisans','Web','Qualification',31000,20,'2025-03-02',24],
  ['OPP-1034','Müşteri 34','Burak Şahin','Akdeniz','ERP Lisans','Fuar','Negotiation',50000,70,'2025-04-08',3],
  ['OPP-1035','Müşteri 35','Burak Şahin','İç Anadolu','Eğitim','Fuar','Closed Lost',116000,0,'2025-05-23',87],
  ['OPP-1036','Müşteri 36','Burak Şahin','Ege','ERP Lisans','Referral','Qualification',156000,20,'2025-05-19',10],
  ['OPP-1037','Müşteri 37','Ayşe Kaya','Marmara','Entegrasyon','Fuar','Qualification',243000,20,'2025-05-16',23],
  ['OPP-1038','Müşteri 38','Elif Yılmaz','Karadeniz','ERP Lisans','Referral','Qualification',160000,20,'2025-01-18',89],
  ['OPP-1039','Müşteri 39','Mehmet Demir','Akdeniz','Danışmanlık','Web','Qualification',156000,20,'2025-01-11',82],
  ['OPP-1040','Müşteri 40','Elif Yılmaz','Akdeniz','Entegrasyon','Web','Closed Won',88000,100,'2025-03-08',29],
  ['OPP-1041','Müşteri 41','Ayşe Kaya','Ege','Eğitim','Referral','Proposal',125000,45,'2025-03-22',12],
  ['OPP-1042','Müşteri 42','Elif Yılmaz','Akdeniz','ERP Lisans','Web','Negotiation',26000,70,'2025-05-18',30],
  ['OPP-1043','Müşteri 43','Deniz Aydın','İç Anadolu','ERP Lisans','Outbound','Qualification',233000,20,'2025-03-04',50],
  ['OPP-1044','Müşteri 44','Ayşe Kaya','Ege','Eğitim','Web','Proposal',164000,45,'2025-05-16',4],
  ['OPP-1045','Müşteri 45','Deniz Aydın','İç Anadolu','Danışmanlık','Inbound','Closed Lost',75000,0,'2025-01-30',16],
  ['OPP-1046','Müşteri 46','Deniz Aydın','Ege','Danışmanlık','Web','Proposal',191000,45,'2025-03-29',29],
  ['OPP-1047','Müşteri 47','Ayşe Kaya','Karadeniz','ERP Lisans','Inbound','Negotiation',170000,70,'2025-04-19',38],
  ['OPP-1048','Müşteri 48','Elif Yılmaz','Marmara','Eğitim','Referral','Proposal',49000,45,'2025-04-24',73],
  ['OPP-1049','Müşteri 49','Burak Şahin','Karadeniz','Danışmanlık','Inbound','Qualification',147000,20,'2025-01-10',50],
  ['OPP-1050','Müşteri 50','Deniz Aydın','Karadeniz','ERP Lisans','Referral','Qualification',86000,20,'2025-04-04',8],
  ['OPP-1051','Müşteri 51','Ayşe Kaya','Ege','Eğitim','Inbound','Closed Won',207000,100,'2025-05-24',55],
  ['OPP-1052','Müşteri 52','Deniz Aydın','Ege','Danışmanlık','Referral','Closed Lost',212000,0,'2025-02-15',55],
  ['OPP-1053','Müşteri 53','Elif Yılmaz','Ege','Bakım/Destek','Outbound','Closed Won',213000,100,'2025-03-05',37],
  ['OPP-1054','Müşteri 54','Mehmet Demir','Marmara','Bakım/Destek','Inbound','Proposal',64000,45,'2025-02-21',61],
  ['OPP-1055','Müşteri 55','Ayşe Kaya','İç Anadolu','Danışmanlık','Referral','Closed Won',14000,100,'2025-02-19',54],
  ['OPP-1056','Müşteri 56','Ayşe Kaya','İç Anadolu','Eğitim','Outbound','Closed Lost',172000,0,'2025-05-11',54],
  ['OPP-1057','Müşteri 57','Deniz Aydın','İç Anadolu','Eğitim','Inbound','Closed Lost',53000,0,'2025-05-29',36],
  ['OPP-1058','Müşteri 58','Elif Yılmaz','Marmara','Eğitim','Outbound','Negotiation',119000,70,'2025-05-11',17],
  ['OPP-1059','Müşteri 59','Burak Şahin','Karadeniz','Bakım/Destek','Inbound','Qualification',8000,20,'2025-05-14',71],
  ['OPP-1060','Müşteri 60','Mehmet Demir','İç Anadolu','Entegrasyon','Outbound','Proposal',88000,45,'2025-02-01',41],
  ['OPP-1061','Müşteri 61','Deniz Aydın','İç Anadolu','Bakım/Destek','Outbound','Closed Won',186000,100,'2025-03-17',73],
  ['OPP-1062','Müşteri 62','Mehmet Demir','Ege','Danışmanlık','Fuar','Proposal',165000,45,'2025-05-26',41],
  ['OPP-1063','Müşteri 63','Burak Şahin','Karadeniz','Eğitim','Outbound','Closed Won',61000,100,'2025-04-21',77],
  ['OPP-1064','Müşteri 64','Deniz Aydın','İç Anadolu','Danışmanlık','Fuar','Negotiation',138000,70,'2025-05-02',24],
  ['OPP-1065','Müşteri 65','Elif Yılmaz','İç Anadolu','Eğitim','Web','Negotiation',31000,70,'2025-03-02',89],
  ['OPP-1066','Müşteri 66','Ayşe Kaya','Ege','ERP Lisans','Referral','Closed Won',19000,100,'2025-03-04',63],
  ['OPP-1067','Müşteri 67','Deniz Aydın','Marmara','Danışmanlık','Web','Negotiation',191000,70,'2025-04-09',66],
  ['OPP-1068','Müşteri 68','Burak Şahin','Ege','ERP Lisans','Inbound','Qualification',207000,20,'2025-04-19',31],
  ['OPP-1069','Müşteri 69','Mehmet Demir','Karadeniz','Danışmanlık','Web','Negotiation',242000,70,'2025-02-01',61],
  ['OPP-1070','Müşteri 70','Mehmet Demir','Akdeniz','Entegrasyon','Web','Closed Won',89000,100,'2025-04-24',81],
  ['OPP-1071','Müşteri 71','Deniz Aydın','Akdeniz','Bakım/Destek','Web','Closed Won',237000,100,'2025-02-10',63],
  ['OPP-1072','Müşteri 72','Burak Şahin','İç Anadolu','Entegrasyon','Outbound','Closed Won',132000,100,'2025-03-03',38],
  ['OPP-1073','Müşteri 73','Burak Şahin','Marmara','Eğitim','Referral','Closed Won',93000,100,'2025-03-23',72],
  ['OPP-1074','Müşteri 74','Elif Yılmaz','Ege','Danışmanlık','Fuar','Qualification',188000,20,'2025-02-24',11],
  ['OPP-1075','Müşteri 75','Burak Şahin','Akdeniz','Bakım/Destek','Fuar','Proposal',23000,45,'2025-02-22',56],
  ['OPP-1076','Müşteri 76','Burak Şahin','Karadeniz','Entegrasyon','Inbound','Closed Lost',105000,0,'2025-05-03',3],
  ['OPP-1077','Müşteri 77','Ayşe Kaya','İç Anadolu','Entegrasyon','Fuar','Closed Won',199000,100,'2025-05-20',80],
  ['OPP-1078','Müşteri 78','Mehmet Demir','Akdeniz','Bakım/Destek','Fuar','Proposal',15000,45,'2025-04-10',46],
  ['OPP-1079','Müşteri 79','Burak Şahin','Ege','Entegrasyon','Referral','Closed Won',144000,100,'2025-01-07',53],
  ['OPP-1080','Müşteri 80','Deniz Aydın','Karadeniz','Bakım/Destek','Inbound','Closed Won',42000,100,'2025-04-29',26],
  ['OPP-1081','Müşteri 81','Elif Yılmaz','İç Anadolu','Bakım/Destek','Referral','Proposal',91000,45,'2025-03-28',51],
  ['OPP-1082','Müşteri 82','Ayşe Kaya','Akdeniz','Bakım/Destek','Inbound','Proposal',12000,45,'2025-05-19',9],
  ['OPP-1083','Müşteri 83','Ayşe Kaya','Ege','ERP Lisans','Inbound','Closed Won',71000,100,'2025-02-21',5],
  ['OPP-1084','Müşteri 84','Deniz Aydın','Ege','ERP Lisans','Fuar','Proposal',152000,45,'2025-02-25',62],
  ['OPP-1085','Müşteri 85','Ayşe Kaya','İç Anadolu','ERP Lisans','Web','Qualification',207000,20,'2025-02-11',42],
  ['OPP-1086','Müşteri 86','Elif Yılmaz','Karadeniz','Entegrasyon','Outbound','Qualification',181000,20,'2025-04-07',53],
  ['OPP-1087','Müşteri 87','Mehmet Demir','Marmara','ERP Lisans','Referral','Negotiation',186000,70,'2025-03-19',90],
  ['OPP-1088','Müşteri 88','Deniz Aydın','Marmara','ERP Lisans','Web','Closed Won',96000,100,'2025-05-17',57],
  ['OPP-1089','Müşteri 89','Ayşe Kaya','Marmara','ERP Lisans','Outbound','Negotiation',225000,70,'2025-04-18',65],
  ['OPP-1090','Müşteri 90','Elif Yılmaz','Akdeniz','Danışmanlık','Fuar','Closed Lost',119000,0,'2025-02-15',69],
  ['OPP-1091','Müşteri 91','Ayşe Kaya','Karadeniz','Bakım/Destek','Web','Closed Won',127000,100,'2025-04-22',78],
  ['OPP-1092','Müşteri 92','Ayşe Kaya','İç Anadolu','Eğitim','Inbound','Closed Lost',233000,0,'2025-04-26',34],
  ['OPP-1093','Müşteri 93','Burak Şahin','Karadeniz','Eğitim','Fuar','Negotiation',15000,70,'2025-05-07',44],
  ['OPP-1094','Müşteri 94','Mehmet Demir','Akdeniz','Eğitim','Outbound','Proposal',79000,45,'2025-03-12',74],
  ['OPP-1095','Müşteri 95','Elif Yılmaz','Karadeniz','Danışmanlık','Inbound','Closed Lost',192000,0,'2025-04-15',65],
  ['OPP-1096','Müşteri 96','Deniz Aydın','Ege','Bakım/Destek','Fuar','Closed Won',210000,100,'2025-01-05',14],
  ['OPP-1097','Müşteri 97','Ayşe Kaya','Ege','Eğitim','Referral','Proposal',177000,45,'2025-05-29',50],
  ['OPP-1098','Müşteri 98','Burak Şahin','Karadeniz','Entegrasyon','Fuar','Negotiation',92000,70,'2025-04-01',61],
  ['OPP-1099','Müşteri 99','Ayşe Kaya','İç Anadolu','Danışmanlık','Inbound','Proposal',88000,45,'2025-01-31',71],
  ['OPP-1100','Müşteri 100','Mehmet Demir','Ege','Eğitim','Fuar','Proposal',193000,45,'2025-05-31',70],
  ['OPP-1101','Müşteri 101','Deniz Aydın','İç Anadolu','Eğitim','Referral','Closed Lost',66000,0,'2025-04-03',25],
  ['OPP-1102','Müşteri 102','Ayşe Kaya','Marmara','Eğitim','Referral','Closed Won',19000,100,'2025-01-14',73],
  ['OPP-1103','Müşteri 103','Ayşe Kaya','Ege','ERP Lisans','Fuar','Negotiation',231000,70,'2025-01-04',76],
  ['OPP-1104','Müşteri 104','Ayşe Kaya','Akdeniz','Danışmanlık','Outbound','Negotiation',21000,70,'2025-03-06',64],
  ['OPP-1105','Müşteri 105','Elif Yılmaz','Marmara','Entegrasyon','Inbound','Proposal',169000,45,'2025-01-14',22],
  ['OPP-1106','Müşteri 106','Mehmet Demir','Karadeniz','Danışmanlık','Inbound','Closed Lost',38000,0,'2025-05-23',56],
  ['OPP-1107','Müşteri 107','Deniz Aydın','Karadeniz','Entegrasyon','Referral','Closed Won',105000,100,'2025-04-26',59],
  ['OPP-1108','Müşteri 108','Ayşe Kaya','Karadeniz','Entegrasyon','Outbound','Closed Lost',166000,0,'2025-01-16',81],
  ['OPP-1109','Müşteri 109','Elif Yılmaz','Ege','ERP Lisans','Outbound','Negotiation',48000,70,'2025-03-03',25],
  ['OPP-1110','Müşteri 110','Deniz Aydın','Marmara','Bakım/Destek','Fuar','Qualification',184000,20,'2025-05-01',40],
  ['OPP-1111','Müşteri 111','Elif Yılmaz','Ege','Bakım/Destek','Outbound','Proposal',26000,45,'2025-03-01',36],
  ['OPP-1112','Müşteri 112','Deniz Aydın','Ege','Danışmanlık','Web','Proposal',173000,45,'2025-02-08',37],
  ['OPP-1113','Müşteri 113','Mehmet Demir','Marmara','Entegrasyon','Outbound','Qualification',199000,20,'2025-05-26',39],
  ['OPP-1114','Müşteri 114','Burak Şahin','Marmara','Bakım/Destek','Outbound','Negotiation',249000,70,'2025-03-11',67],
  ['OPP-1115','Müşteri 115','Deniz Aydın','Akdeniz','ERP Lisans','Web','Proposal',235000,45,'2025-04-21',44],
  ['OPP-1116','Müşteri 116','Deniz Aydın','İç Anadolu','Entegrasyon','Referral','Qualification',158000,20,'2025-01-06',89],
  ['OPP-1117','Müşteri 117','Ayşe Kaya','Karadeniz','Bakım/Destek','Referral','Qualification',140000,20,'2025-04-24',38],
  ['OPP-1118','Müşteri 118','Mehmet Demir','Karadeniz','ERP Lisans','Fuar','Proposal',128000,45,'2025-03-31',55],
  ['OPP-1119','Müşteri 119','Ayşe Kaya','İç Anadolu','Eğitim','Referral','Closed Won',113000,100,'2025-05-07',39],
  ['OPP-1120','Müşteri 120','Burak Şahin','Karadeniz','Eğitim','Inbound','Qualification',72000,20,'2025-03-24',17],
];

// ── Kolon indeksleri (0-tabanlı, başlık satırı hariç) ────────
const COL = { ID:0, MUSTERI:1, TEMSILCI:2, BOLGE:3, URUN:4, KAYNAK:5, ASAMA:6, TUTAR:7, OLASILIK:8, TARIH:9, ACIK_GUN:10 };
const OPEN_STAGES = ['Qualification','Proposal','Negotiation'];

// ── Renkler ──────────────────────────────────────────────────
const COLORS = {
  brand:      '#1A3C5E',
  accent:     '#2E86AB',
  green:      '#27AE60',
  orange:     '#E67E22',
  red:        '#E74C3C',
  purple:     '#8E44AD',
  lightBlue:  '#EBF5FB',
  lightGreen: '#EAFAF1',
  lightOrange:'#FEF9E7',
  white:      '#FFFFFF',
  headerText: '#FFFFFF',
  bodyBg:     '#F8F9FA',
  border:     '#D5D8DC',
};

// ── Yardımcı: veri satırları (başlık hariç) ──────────────────
function dataRows() {
  return CSV_DATA.slice(1);
}

// ── Yardımcı: para formatı ───────────────────────────────────
function formatMoney(n) {
  return '₺' + Math.round(n).toLocaleString('tr-TR');
}

// ============================================================
// ANA FONKSİYON
// ============================================================
function createCRMDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Eski sayfaları temizle
  ['📊 Dashboard','📋 Veri','_Huni','_Bolge','_Temsilci','_Kaynak'].forEach(name => {
    const sh = ss.getSheetByName(name);
    if (sh) ss.deleteSheet(sh);
  });

  const dataSheet   = buildDataSheet(ss);
  const huniSheet   = buildHuniSheet(ss);
  const bolgeSheet  = buildBolgeSheet(ss);
  const temsilciSh  = buildTemsilciSheet(ss);
  const kaynaklarSh = buildKaynaklarSheet(ss);
  buildDashboard(ss, huniSheet, bolgeSheet, temsilciSh, kaynaklarSh);

  ss.setActiveSheet(ss.getSheetByName('📊 Dashboard'));
  SpreadsheetApp.getUi().alert('✅ CRM Dashboard başarıyla oluşturuldu!');
}

// ── Menü ─────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📊 CRM Dashboard')
    .addItem('Dashboard Oluştur / Yenile', 'createCRMDashboard')
    .addToUi();
}

// ============================================================
// 1. VERİ SAYFASI
// ============================================================
function buildDataSheet(ss) {
  const sh = ss.insertSheet('📋 Veri');
  sh.getRange(1, 1, CSV_DATA.length, CSV_DATA[0].length).setValues(CSV_DATA);

  // Başlık satırı stili
  const hdr = sh.getRange(1, 1, 1, CSV_DATA[0].length);
  hdr.setBackground(COLORS.brand)
     .setFontColor(COLORS.headerText)
     .setFontWeight('bold')
     .setHorizontalAlignment('center');

  // Sütun genişlikleri
  [100,100,130,110,130,90,110,100,80,120,80].forEach((w,i) => sh.setColumnWidth(i+1, w));
  sh.setFrozenRows(1);

  // Bant rengi
  sh.getRange(2, 1, CSV_DATA.length-1, CSV_DATA[0].length)
    .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);

  return sh;
}

// ============================================================
// 2. HUNİ (ASAMA) ÖZET SAYFASI
// ============================================================
function buildHuniSheet(ss) {
  const sh = ss.insertSheet('_Huni');
  sh.hideSheet();
  const rows = dataRows();

  const stages = ['Qualification','Proposal','Negotiation','Closed Won','Closed Lost'];
  const agg = {};
  stages.forEach(s => { agg[s] = { count:0, tutar:0 }; });

  rows.forEach(r => {
    const s = r[COL.ASAMA];
    if (agg[s]) { agg[s].count++; agg[s].tutar += r[COL.TUTAR]; }
  });

  const header = [['Aşama','Fırsat Sayısı','Toplam Tutar (TRY)']];
  const data   = stages.map(s => [s, agg[s].count, agg[s].tutar]);
  sh.getRange(1,1,1,3).setValues(header);
  sh.getRange(2,1,data.length,3).setValues(data);
  return sh;
}

// ============================================================
// 3. BÖLGE ÖZET SAYFASI (kazanılan ciro)
// ============================================================
function buildBolgeSheet(ss) {
  const sh = ss.insertSheet('_Bolge');
  sh.hideSheet();
  const rows = dataRows();

  const agg = {};
  rows.forEach(r => {
    const b = r[COL.BOLGE];
    if (!agg[b]) agg[b] = 0;
    if (r[COL.ASAMA] === 'Closed Won') agg[b] += r[COL.TUTAR];
  });

  const sorted = Object.entries(agg).sort((a,b) => b[1]-a[1]);
  sh.getRange(1,1,1,2).setValues([['Bölge','Kazanılan Ciro (TRY)']]);
  sh.getRange(2,1,sorted.length,2).setValues(sorted);
  return sh;
}

// ============================================================
// 4. TEMSİLCİ ÖZET SAYFASI
// ============================================================
function buildTemsilciSheet(ss) {
  const sh = ss.insertSheet('_Temsilci');
  sh.hideSheet();
  const rows = dataRows();

  const agg = {};
  rows.forEach(r => {
    const t = r[COL.TEMSILCI];
    if (!agg[t]) agg[t] = { won:0, total:0, wonTutar:0 };
    agg[t].total++;
    if (r[COL.ASAMA] === 'Closed Won') { agg[t].won++; agg[t].wonTutar += r[COL.TUTAR]; }
  });

  const sorted = Object.entries(agg)
    .map(([t,v]) => [t, v.wonTutar, v.total > 0 ? Math.round(v.won/v.total*100) : 0, v.won, v.total])
    .sort((a,b) => b[1]-a[1]);

  sh.getRange(1,1,1,5).setValues([['Temsilci','Kazanılan Ciro','Kazanma Oranı (%)','Kazanılan','Toplam']]);
  sh.getRange(2,1,sorted.length,5).setValues(sorted);
  return sh;
}

// ============================================================
// 5. KAYNAK ÖZET SAYFASI
// ============================================================
function buildKaynaklarSheet(ss) {
  const sh = ss.insertSheet('_Kaynak');
  sh.hideSheet();
  const rows = dataRows();

  const agg = {};
  rows.forEach(r => {
    const k = r[COL.KAYNAK];
    if (!agg[k]) agg[k] = { count:0, tutar:0 };
    agg[k].count++;
    agg[k].tutar += r[COL.TUTAR];
  });

  const sorted = Object.entries(agg).sort((a,b) => b[1].count-a[1].count);
  sh.getRange(1,1,1,3).setValues([['Kaynak','Fırsat Sayısı','Toplam Tutar']]);
  sh.getRange(2,1,sorted.length,3).setValues(sorted.map(([k,v])=>[k,v.count,v.tutar]));
  return sh;
}

// ============================================================
// 6. DASHBOARD SAYFASI
// ============================================================
function buildDashboard(ss, huniSheet, bolgeSheet, temsilciSh, kaynaklarSh) {
  const sh = ss.insertSheet('📊 Dashboard', 0);

  // Sayfa arkaplan rengi
  sh.setTabColor(COLORS.brand);

  // Genel satır/sütun boyutları
  sh.setColumnWidth(1, 18);   // sol kenar boşluğu
  for (let c = 2; c <= 14; c++) sh.setColumnWidth(c, 110);
  sh.setColumnWidth(15, 18);  // sağ kenar boşluğu
  for (let r = 1; r <= 80; r++) sh.setRowHeight(r, 28);

  // ── Başlık ───────────────────────────────────────────────
  _mergeStyle(sh, 2,2, 2,13, '📊 CRM Pipeline Dashboard — 2025', {
    bg: COLORS.brand, fc: '#FFFFFF', size:18, bold:true, align:'center', valign:'middle'
  });
  sh.setRowHeight(2, 48);

  _mergeStyle(sh, 3,2, 3,13, `Veri: ${dataRows().length} fırsat  |  Güncelleme: ${new Date().toLocaleDateString('tr-TR')}`, {
    bg: COLORS.accent, fc:'#FFFFFF', size:10, align:'center', valign:'middle'
  });

  // ── KPI Kartları ─────────────────────────────────────────
  const kpis = computeKPIs();
  const kpiDefs = [
    { label:'Toplam Pipeline',      value: formatMoney(kpis.totalPipeline),    sub:'(açık fırsatlar)',  bg: COLORS.accent,  fc:'#fff' },
    { label:'Ağırlıklı Pipeline',   value: formatMoney(kpis.weightedPipeline), sub:'(olasılık × tutar)',bg: '#16A085',      fc:'#fff' },
    { label:'Kazanılan Ciro',       value: formatMoney(kpis.wonRevenue),        sub:'Closed Won',       bg: COLORS.green,   fc:'#fff' },
    { label:'Açık Fırsat Sayısı',   value: kpis.openCount + ' adet',           sub:'aktif pipeline',   bg: COLORS.orange,  fc:'#fff' },
    { label:'Ort. Açık Gün',        value: Math.round(kpis.avgOpenDays) + ' gün', sub:'açık fırsatlar',bg: COLORS.purple,  fc:'#fff' },
  ];

  // 5 KPI kartı: sütunlar 2,4,6,8,10 (her biri 2 sütun genişliğinde)
  const kpiCols = [2,4,6,8,10];
  sh.setRowHeight(5, 16);  // üst boşluk
  sh.setRowHeight(6, 38);
  sh.setRowHeight(7, 24);
  sh.setRowHeight(8, 20);
  sh.setRowHeight(9, 16);  // alt boşluk

  kpiDefs.forEach((k, i) => {
    const c = kpiCols[i];
    // Kart arkaplanı
    _mergeStyle(sh, 6, c, 8, c+1, '', { bg: k.bg });
    // Başlık
    _mergeStyle(sh, 6, c, 6, c+1, k.label.toUpperCase(), {
      bg: k.bg, fc: 'rgba(255,255,255,0.85)', size:8, bold:false, align:'center', valign:'bottom'
    });
    // Değer
    _mergeStyle(sh, 7, c, 7, c+1, k.value, {
      bg: k.bg, fc: k.fc, size:14, bold:true, align:'center', valign:'middle'
    });
    // Alt not
    _mergeStyle(sh, 8, c, 8, c+1, k.sub, {
      bg: k.bg, fc: 'rgba(255,255,255,0.75)', size:8, align:'center', valign:'top'
    });
  });

  // ── Bölüm: Sol üst — Huni Grafiği ───────────────────────
  sh.setRowHeight(10, 20);
  _sectionTitle(sh, 11, 2, 6, '📌 Aşamaya Göre Huni (Fırsat Sayısı & Tutar)');
  sh.setRowHeight(11, 30);

  // Huni grafiği veri aralığı: _Huni!A1:C6
  const huniRange = huniSheet.getRange(1, 1, 6, 3);
  const huniChart = sh.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(huniRange)
    .setPosition(12, 2, 0, 0)
    .setNumRows(22)
    .setNumColumns(6)
    .setOption('title', '')
    .setOption('legend', { position: 'bottom' })
    .setOption('colors', [COLORS.accent, COLORS.green])
    .setOption('hAxis', { format: '#,##0' })
    .setOption('bars', 'horizontal')
    .setOption('isStacked', false)
    .build();
  sh.insertChart(huniChart);

  // ── Bölüm: Sağ üst — Kaynak Pasta Grafiği ────────────────
  _sectionTitle(sh, 11, 9, 5, '🔵 Kaynak Kırılımı (Fırsat Dağılımı)');

  const kayRange = kaynaklarSh.getRange(1, 1, kaynaklarSh.getLastRow(), 2);
  const kayChart = sh.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(kayRange)
    .setPosition(12, 9, 0, 0)
    .setNumRows(22)
    .setNumColumns(5)
    .setOption('title', '')
    .setOption('pieHole', 0.4)   // donut
    .setOption('legend', { position: 'right' })
    .setOption('colors', ['#2E86AB','#27AE60','#E67E22','#8E44AD','#E74C3C'])
    .build();
  sh.insertChart(kayChart);

  // ── Bölüm: Sol alt — Bölge Çubuk Grafiği ────────────────
  sh.setRowHeight(35, 20);
  _sectionTitle(sh, 36, 2, 6, '🗺️ Bölge Bazında Kazanılan Ciro');
  sh.setRowHeight(36, 30);

  const bolgeRange = bolgeSheet.getRange(1, 1, bolgeSheet.getLastRow(), 2);
  const bolgeChart = sh.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(bolgeRange)
    .setPosition(37, 2, 0, 0)
    .setNumRows(20)
    .setNumColumns(6)
    .setOption('title', '')
    .setOption('legend', { position: 'none' })
    .setOption('colors', [COLORS.green])
    .setOption('vAxis', { format: '₺#,##0' })
    .setOption('bar', { groupWidth: '60%' })
    .build();
  sh.insertChart(bolgeChart);

  // ── Bölüm: Sağ alt — Temsilci Performans Tablosu ─────────
  _sectionTitle(sh, 36, 9, 5, '🏆 Satış Temsilcisi Performansı');

  const temData   = temsilciSh.getRange(1, 1, temsilciSh.getLastRow(), 5).getValues();
  const temHdr    = temData[0];
  const temRows   = temData.slice(1).sort((a,b) => b[1]-a[1]);

  // Tablo başlığı
  const tblStartRow = 37;
  const tblStartCol = 9;
  const colWidths   = ['Temsilci','Kazanılan Ciro','Kazanma %','Kazanılan','Toplam'];

  // Başlık satırı
  colWidths.forEach((h, i) => {
    const cell = sh.getRange(tblStartRow, tblStartCol + i);
    cell.setValue(h)
        .setBackground(COLORS.brand)
        .setFontColor('#FFFFFF')
        .setFontWeight('bold')
        .setFontSize(9)
        .setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setBorder(true,true,true,true,false,false, COLORS.border, SpreadsheetApp.BorderStyle.SOLID);
    sh.setRowHeight(tblStartRow, 26);
  });

  // Veri satırları
  temRows.forEach((row, ri) => {
    const rr   = tblStartRow + 1 + ri;
    const bg   = ri % 2 === 0 ? '#FFFFFF' : '#EBF5FB';
    const vals = [row[0], formatMoney(row[1]), row[2]+'%', row[3], row[4]];

    vals.forEach((v, ci) => {
      sh.getRange(rr, tblStartCol + ci)
        .setValue(v)
        .setBackground(bg)
        .setFontSize(9)
        .setHorizontalAlignment(ci === 0 ? 'left' : 'center')
        .setVerticalAlignment('middle')
        .setBorder(true,true,true,true,false,false, COLORS.border, SpreadsheetApp.BorderStyle.SOLID);
    });
    sh.setRowHeight(rr, 24);

    // Kazanma oranı için renk göstergesi
    const oran = row[2];
    const oranCell = sh.getRange(rr, tblStartCol + 2);
    if (oran >= 60)      oranCell.setFontColor(COLORS.green);
    else if (oran >= 40) oranCell.setFontColor(COLORS.orange);
    else                 oranCell.setFontColor(COLORS.red);
    oranCell.setFontWeight('bold');
  });

  // Sütun genişlikleri tablo için
  sh.setColumnWidth(tblStartCol,     130);
  sh.setColumnWidth(tblStartCol + 1, 120);
  sh.setColumnWidth(tblStartCol + 2, 90);
  sh.setColumnWidth(tblStartCol + 3, 80);
  sh.setColumnWidth(tblStartCol + 4, 70);

  // ── Alt bilgi ────────────────────────────────────────────
  const lastDataRow = tblStartRow + temRows.length + 3;
  _mergeStyle(sh, lastDataRow, 2, lastDataRow, 13,
    '© CRM Dashboard · AdAstra Eğitim · Google Apps Script', {
    bg: COLORS.brand, fc:'rgba(255,255,255,0.6)', size:8, align:'center', valign:'middle'
  });
  sh.setRowHeight(lastDataRow, 22);

  // Izgarayı gizle
  sh.setHiddenGridlines(true);
}

// ============================================================
// KPI HESAPLAMALARI
// ============================================================
function computeKPIs() {
  const rows = dataRows();
  let totalPipeline = 0, weightedPipeline = 0, wonRevenue = 0;
  let openCount = 0, openDaySum = 0;

  rows.forEach(r => {
    const stage   = r[COL.ASAMA];
    const tutar   = r[COL.TUTAR];
    const olasilik= r[COL.OLASILIK] / 100;
    const gun     = r[COL.ACIK_GUN];

    if (OPEN_STAGES.includes(stage)) {
      totalPipeline    += tutar;
      weightedPipeline += tutar * olasilik;
      openCount++;
      openDaySum += gun;
    }
    if (stage === 'Closed Won') wonRevenue += tutar;
  });

  return {
    totalPipeline,
    weightedPipeline,
    wonRevenue,
    openCount,
    avgOpenDays: openCount > 0 ? openDaySum / openCount : 0,
  };
}

// ============================================================
// YARDIMCI STİL FONKSİYONLARI
// ============================================================
function _mergeStyle(sh, r1, c1, r2, c2, value, opts) {
  const range = sh.getRange(r1, c1, r2-r1+1, c2-c1+1);
  if (r1!==r2 || c1!==c2) {
    try { range.merge(); } catch(e) {}
  }
  if (opts.bg)     range.setBackground(opts.bg);
  if (opts.fc)     range.setFontColor(opts.fc);
  if (opts.size)   range.setFontSize(opts.size);
  if (opts.bold !== undefined) range.setFontWeight(opts.bold ? 'bold' : 'normal');
  if (opts.align)  range.setHorizontalAlignment(opts.align);
  if (opts.valign) range.setVerticalAlignment(opts.valign);
  if (value !== undefined && value !== '') range.setValue(value);
}

function _sectionTitle(sh, row, col, span, title) {
  const range = sh.getRange(row, col, 1, span);
  try { range.merge(); } catch(e) {}
  range.setValue(title)
       .setBackground(COLORS.brand)
       .setFontColor('#FFFFFF')
       .setFontWeight('bold')
       .setFontSize(10)
       .setHorizontalAlignment('left')
       .setVerticalAlignment('middle')
       .setPaddingTop !== undefined ? null : null; // padding API yok, boyut ile telafi
}
