# Builds the README chart from google-trends-pl-2021-2026.csv:
# monthly averages of weekly Google Trends interest (Poland) for Revit, ArchiCAD and AutoCAD,
# as two static SVGs (light / dark) plus a yearly table printed as Markdown.
import csv, os
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
SERIES = [('revit', 'Revit'), ('archicad', 'ArchiCAD'), ('autocad', 'AutoCAD')]
THEMES = {
    'light': {'bg': '#fcfcfb', 'ink': '#0b0b0b', 'ink2': '#52514e', 'grid': '#e4e3df', 'axis': '#b9b8b2',
              'band': '#f1f0ec', 'c': ['#2a78d6', '#eb6834', '#1baf7a']},
    'dark':  {'bg': '#1a1a19', 'ink': '#f0efec', 'ink2': '#c3c2b7', 'grid': '#2f2f2d', 'axis': '#555450',
              'band': '#232322', 'c': ['#3987e5', '#d95926', '#199e70']},
}
FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

def load():
    rows = []
    with open(os.path.join(HERE, 'google-trends-pl-2021-2026.csv'), encoding='utf-8') as f:
        for r in csv.DictReader(l for l in f if not l.startswith('#')):
            rows.append({'week': r['week'], **{k: int(r[k]) for k, _ in SERIES}})
    return rows

def monthly(rows):
    acc = defaultdict(lambda: defaultdict(list))
    for r in rows:
        ym = r['week'][:7]
        for k, _ in SERIES: acc[ym][k].append(r[k])
    months = sorted(acc)
    # drop partial first/last month (fewer than 3 weeks)
    months = [m for m in months if len(acc[m]['revit']) >= 3]
    return months, {k: [sum(acc[m][k]) / len(acc[m][k]) for m in months] for k, _ in SERIES}

def yearly(rows):
    acc = defaultdict(lambda: defaultdict(list))
    for r in rows:
        for k, _ in SERIES: acc[r['week'][:4]][k].append(r[k])
    return {y: {k: sum(v[k]) / len(v[k]) for k, _ in SERIES} for y, v in acc.items() if len(v['revit']) >= 40}

def svg(theme, months, vals):
    t = THEMES[theme]
    W, H = 960, 520
    L, R, T, B = 56, 150, 92, 56            # plot margins (right margin holds direct labels)
    pw, ph = W - L - R, H - T - B
    n = len(months)
    x = lambda i: L + pw * i / (n - 1)
    y = lambda v: T + ph * (1 - v / 100.0)
    o = []
    o.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" font-family="%s" '
             'role="img" aria-labelledby="t d">' % (W, H, W, H, FONT))
    o.append('<title id="t">Revit, ArchiCAD i AutoCAD w Google Trends, Polska 2021-2026</title>')
    o.append('<desc id="d">Srednie miesieczne zainteresowanie wzgledne 0-100. Revit rosnie z ok. 18 w 2022 do ok. 30 w 2025, '
             'ArchiCAD stoi na ok. 13, AutoCAD na ok. 60 z wyrazna sezonowoscia.</desc>')
    o.append('<rect width="%d" height="%d" rx="12" fill="%s"/>' % (W, H, t['bg']))
    # title + subtitle
    o.append('<text x="%d" y="38" font-size="20" font-weight="600" fill="%s">Revit w Polsce rośnie: 2× więcej wyszukiwań niż ArchiCAD</text>' % (L, t['ink']))
    o.append('<text x="%d" y="62" font-size="13" fill="%s">Google Trends, Polska, listopad 2021 – listopad 2026 · zainteresowanie względne (0–100), średnia miesięczna</text>' % (L, t['ink2']))
    # summer bands (July-August) = seasonality cue
    for i, m in enumerate(months):
        if m[5:] == '07' and i + 1 < n:
            x0 = x(i) - pw / (n - 1) / 2; x1 = x(min(i + 1, n - 1)) + pw / (n - 1) / 2
            o.append('<rect x="%.1f" y="%d" width="%.1f" height="%d" fill="%s"/>' % (x0, T, x1 - x0, ph, t['band']))
    # grid + y labels
    for v in (0, 25, 50, 75, 100):
        o.append('<line x1="%d" x2="%d" y1="%.1f" y2="%.1f" stroke="%s" stroke-width="1"/>' % (L, L + pw, y(v), y(v), t['axis'] if v == 0 else t['grid']))
        o.append('<text x="%d" y="%.1f" font-size="12" fill="%s" text-anchor="end">%d</text>' % (L - 10, y(v) + 4, t['ink2'], v))
    # x labels: each January
    for i, m in enumerate(months):
        if m[5:] == '01':
            o.append('<line x1="%.1f" x2="%.1f" y1="%d" y2="%d" stroke="%s"/>' % (x(i), x(i), T + ph, T + ph + 5, t['axis']))
            o.append('<text x="%.1f" y="%d" font-size="12" fill="%s" text-anchor="middle">%s</text>' % (x(i), T + ph + 22, t['ink2'], m[:4]))
    o.append('<text x="%.1f" y="%d" font-size="11" fill="%s" text-anchor="middle">wakacje (lip–sie)</text>' % (
        x([i for i, m in enumerate(months) if m == '2025-07'][0]) + pw / (n - 1) / 2, T + 16, t['ink2']))
    # lines (Revit drawn last so it sits on top)
    order = [2, 1, 0]
    for si in order:
        k, name = SERIES[si]
        pts = ' '.join('%.1f,%.1f' % (x(i), y(v)) for i, v in enumerate(vals[k]))
        w = 3 if k == 'revit' else 2
        o.append('<polyline points="%s" fill="none" stroke="%s" stroke-width="%d" stroke-linejoin="round" stroke-linecap="round"/>' % (pts, t['c'][si], w))
    # end markers with surface ring + direct labels (last 12 months average)
    last = {k: sum(vals[k][-12:]) / 12 for k, _ in SERIES}
    label_y = {k: y(vals[k][-1]) for k, _ in SERIES}
    # keep labels apart (min 30 px)
    ks = sorted(label_y, key=lambda k: label_y[k])
    for a, b in zip(ks, ks[1:]):
        if label_y[b] - label_y[a] < 30: label_y[b] = label_y[a] + 30
    for si, (k, name) in enumerate(SERIES):
        ex, ey = x(n - 1), y(vals[k][-1])
        o.append('<circle cx="%.1f" cy="%.1f" r="5" fill="%s" stroke="%s" stroke-width="2"/>' % (ex, ey, t['c'][si], t['bg']))
        ly = label_y[k]
        o.append('<text x="%.1f" y="%.1f" font-size="14" font-weight="600" fill="%s">%s</text>' % (ex + 14, ly - 2, t['ink'], name))
        o.append('<text x="%.1f" y="%.1f" font-size="12" fill="%s">śr. 12 mies.: %d</text>' % (ex + 14, ly + 14, t['ink2'], round(last[k])))
    # legend (always present for >= 2 series)
    lx = L
    for si, (k, name) in enumerate(SERIES):
        o.append('<line x1="%d" x2="%d" y1="%d" y2="%d" stroke="%s" stroke-width="3" stroke-linecap="round"/>' % (lx, lx + 18, T - 12, T - 12, t['c'][si]))
        o.append('<text x="%d" y="%d" font-size="12" fill="%s">%s</text>' % (lx + 24, T - 8, t['ink'], name))
        lx += 110
    o.append('<text x="%d" y="%d" font-size="11" fill="%s">Źródło: Google Trends (dane tygodniowe uśrednione do miesięcy). „revit” obejmuje też markę odzieży motocyklowej REV’IT!.</text>' % (L, H - 14, t['ink2']))
    o.append('</svg>')
    return '\n'.join(o)

# ---------------- long view 2004-2026 (monthly CSV exported from Google Trends) ----------------
MONTHS_PL = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru']

def load_long():
    out = []
    with open(os.path.join(HERE, 'google-trends-pl-2004-2026.csv'), encoding='utf-8') as f:
        for r in csv.reader(f):
            if r and r[0][:2] == '20':
                v = lambda s: 0.5 if s.strip() == '<1' else float(s)
                out.append((r[0], v(r[1]), v(r[2]), v(r[3])))
    return out

def moving(xs, n=12):
    # trailing 12-month mean: removes the academic-year seasonality, keeps the direction
    return [sum(xs[i - n + 1:i + 1]) / n if i >= n - 1 else None for i in range(len(xs))]

def svg_long(theme, data):
    t = THEMES[theme]
    W, H = 960, 520
    L, R, T, B = 56, 150, 92, 56
    pw, ph = W - L - R, H - T - B
    months = [d[0] for d in data]
    rv = [d[1] for d in data]; av = [d[2] for d in data]
    rma, ama = moving(rv), moving(av)
    n = len(months); top = 25.0
    x = lambda i: L + pw * i / (n - 1)
    y = lambda v: T + ph * (1 - min(v, top) / top)
    cross = [i for i in range(12, n) if rma[i] > ama[i] and rma[i - 1] <= ama[i - 1]][0]
    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" font-family="%s" role="img" aria-labelledby="t2 d2">' % (W, H, W, H, FONT),
         '<title id="t2">Revit i ArchiCAD w Google Trends, Polska 2004-2026</title>',
         '<desc id="d2">Dane miesieczne i linie trendu (srednia 12 miesiecy). ArchiCAD spada z ok. 14 do ok. 5, Revit rosnie od zera do ok. 10. '
         'Revit wyprzedza ArchiCAD w %s %s.</desc>' % (MONTHS_PL[int(months[cross][5:]) - 1], months[cross][:4]),
         '<rect width="%d" height="%d" rx="12" fill="%s"/>' % (W, H, t['bg']),
         '<text x="%d" y="38" font-size="20" font-weight="600" fill="%s">Revit zastępuje ArchiCAD: od %s %s wyszukuje się go częściej</text>' % (
             L, t['ink'], {'maj': 'maja'}.get(MONTHS_PL[int(months[cross][5:]) - 1], MONTHS_PL[int(months[cross][5:]) - 1]), months[cross][:4]),
         '<text x="%d" y="62" font-size="13" fill="%s">Google Trends, Polska, 2004 – listopad 2026 · dane miesięczne (cienkie) i linia trendu: średnia z 12 miesięcy (grube)</text>' % (L, t['ink2'])]
    for v in (0, 5, 10, 15, 20, 25):
        o.append('<line x1="%d" x2="%d" y1="%.1f" y2="%.1f" stroke="%s"/>' % (L, L + pw, y(v), y(v), t['axis'] if v == 0 else t['grid']))
        o.append('<text x="%d" y="%.1f" font-size="12" fill="%s" text-anchor="end">%d</text>' % (L - 10, y(v) + 4, t['ink2'], v))
    for i, m in enumerate(months):
        if m[5:] == '01' and int(m[:4]) % 2 == 0:
            o.append('<line x1="%.1f" x2="%.1f" y1="%d" y2="%d" stroke="%s"/>' % (x(i), x(i), T + ph, T + ph + 5, t['axis']))
            o.append('<text x="%.1f" y="%d" font-size="12" fill="%s" text-anchor="middle">%s</text>' % (x(i), T + ph + 22, t['ink2'], m[:4]))
    # crossover marker
    cx = x(cross)
    o.append('<line x1="%.1f" x2="%.1f" y1="%d" y2="%d" stroke="%s" stroke-dasharray="4 4"/>' % (cx, cx, T + 6, T + ph, t['ink2']))
    o.append('<text x="%.1f" y="%d" font-size="12" fill="%s">%s %s: Revit wyprzedza ArchiCAD</text>' % (
        cx + 8, T + 18, t['ink'], MONTHS_PL[int(months[cross][5:]) - 1], months[cross][:4]))
    # raw monthly (thin, faded) then trend (thick); Revit on top
    for si, raw, ma in ((1, av, ama), (0, rv, rma)):
        col = t['c'][si]
        o.append('<polyline points="%s" fill="none" stroke="%s" stroke-opacity="0.35" stroke-width="1.5" stroke-linejoin="round"/>' % (
            ' '.join('%.1f,%.1f' % (x(i), y(v)) for i, v in enumerate(raw)), col))
        o.append('<polyline points="%s" fill="none" stroke="%s" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' % (
            ' '.join('%.1f,%.1f' % (x(i), y(v)) for i, v in enumerate(ma) if v is not None), col))
    # crossover dot on the trend line
    o.append('<circle cx="%.1f" cy="%.1f" r="5" fill="%s" stroke="%s" stroke-width="2"/>' % (cx, y(rma[cross]), t['ink'], t['bg']))
    # direct labels at the end of the trend lines
    ends = {0: y(rma[-1]), 1: y(ama[-1])}
    if abs(ends[0] - ends[1]) < 32: ends[1] = ends[0] + 32
    for si, name, ma in ((0, 'Revit', rma), (1, 'ArchiCAD', ama)):
        ex = x(n - 1)
        o.append('<circle cx="%.1f" cy="%.1f" r="5" fill="%s" stroke="%s" stroke-width="2"/>' % (ex, y(ma[-1]), t['c'][si], t['bg']))
        o.append('<text x="%.1f" y="%.1f" font-size="14" font-weight="600" fill="%s">%s</text>' % (ex + 14, ends[si] - 2, t['ink'], name))
        o.append('<text x="%.1f" y="%.1f" font-size="12" fill="%s">trend: %s</text>' % (ex + 14, ends[si] + 14, t['ink2'], ('%.1f' % ma[-1]).replace('.', ',')))
    lx = L
    for si, name in ((0, 'Revit'), (1, 'ArchiCAD')):
        o.append('<line x1="%d" x2="%d" y1="%d" y2="%d" stroke="%s" stroke-width="3" stroke-linecap="round"/>' % (lx, lx + 18, T - 12, T - 12, t['c'][si]))
        o.append('<text x="%d" y="%d" font-size="12" fill="%s">%s</text>' % (lx + 24, T - 8, t['ink'], name))
        lx += 110
    o.append('<text x="%d" y="%d" font-size="11" fill="%s">Źródło: Google Trends (eksport CSV). Skala wspólna z AutoCAD: 100 = szczyt AutoCAD w marcu 2004, stąd niskie wartości.</text>' % (L, H - 14, t['ink2']))
    o.append('</svg>')
    return '\n'.join(o)

rows = load()
months, vals = monthly(rows)
for th in THEMES:
    open(os.path.join(HERE, 'trends-pl-%s.svg' % th), 'w', encoding='utf-8', newline='\n').write(svg(th, months, vals))
long_data = load_long()
for th in THEMES:
    open(os.path.join(HERE, 'trends-pl-2004-%s.svg' % th), 'w', encoding='utf-8', newline='\n').write(svg_long(th, long_data))
print('| Rok | Revit | ArchiCAD | AutoCAD | Revit / ArchiCAD |')
print('|---|---|---|---|---|')
for yr in range(2004, 2027, 2) if False else (2004, 2008, 2012, 2014, 2015, 2016, 2018, 2020, 2022, 2024, 2025, 2026):
    sel = [d for d in long_data if d[0].startswith(str(yr))]
    r = sum(d[1] for d in sel) / len(sel); a = sum(d[2] for d in sel) / len(sel); c = sum(d[3] for d in sel) / len(sel)
    print('| %d | %s | %s | %d | %s |' % (yr, ('%.1f' % r).replace('.', ','), ('%.1f' % a).replace('.', ','), round(c),
                                       (('%.2f×' % (r / a)).replace('.', ',')) if r >= 0.5 else '–'))
