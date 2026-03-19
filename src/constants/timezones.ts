export const timeZones = Intl.supportedValuesOf('timeZone').filter(
  (zone) =>
    zone.startsWith('America/Sao_Paulo') ||
    zone.startsWith('America/Fortaleza') ||
    zone.startsWith('America/Recife') ||
    zone.startsWith('America/Bahia') ||
    zone.startsWith('America/Belem') ||
    zone.startsWith('America/Cuiaba') ||
    zone.startsWith('America/Boa_Vista'),
);
