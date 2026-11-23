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

rows = load()
months, vals = monthly(rows)
for th in THEMES:
    open(os.path.join(HERE, 'trends-pl-%s.svg' % th), 'w', encoding='utf-8', newline='\n').write(svg(th, months, vals))
ys = yearly(rows)
print('| Rok | Revit | ArchiCAD | AutoCAD | Revit / ArchiCAD |')
print('|---|---|---|---|---|')
for yv in sorted(ys):
    v = ys[yv]
    print('| %s | %d | %d | %d | %.1f× |' % (yv, round(v['revit']), round(v['archicad']), round(v['autocad']), v['revit'] / v['archicad']))
