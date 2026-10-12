import { describe, it, expect, beforeAll } from '@jest/globals';

const CARD = `
<div class="col-12 mc-hand-hover odd" onclick="window.location.href='https://www.medlife.ro/cariere/job-apply/25119'">
  <div class="card-title-joburi-detalii col-lg-7">
    <div>Medic Oftalmolog - MedLife Cluj</div>
    <div class="card-text-joburi"><img src="x.png"><span>Laboratorul MedLife Cluj</span></div>
    <div class="card-text-joburi"><span>Medic Specialist Oftalmologie</span></div>
    <div class="card-text-joburi"><span>17.06 - 31.12.2026</span></div>
  </div>
</div>
<div class="col-12 mc-hand-hover even" onclick="window.location.href='https://www.medlife.ro/cariere/job-apply/9221'">
  <div class="card-title-joburi-detalii col-lg-7">
    <div>Receptioner - Ghencea Medica</div>
    <div class="card-text-joburi"><span>Ghencea Medica</span></div>
    <div class="card-text-joburi"><span>01.09 - 30.11.2026</span></div>
  </div>
</div>`;

describe('Medlife card parser', () => {
  let index;
  beforeAll(async () => { index = await import('../../scraper/index.js'); });

  it('extracts title, permalink, end-of-validity deadline and city', () => {
    const items = index.parseMedlifeCards(CARD);
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      title: 'Medic Oftalmolog - MedLife Cluj',
      url: 'https://www.medlife.ro/cariere/job-apply/25119',
      location: ['Cluj-Napoca']
    });
    expect(items[0].expirationdate).toBe('2026-12-31T23:59:59.000Z');
    expect(items[1].expirationdate).toBe('2026-11-30T23:59:59.000Z');
  });

  it('medlifeCity is diacritic-insensitive and null when unknown', () => {
    expect(index.medlifeCity('Asistent - Bucuresti Floreasca')).toEqual(['Bucuresti']);
    expect(index.medlifeCity('Fara oras')).toBeNull();
  });
});