"""Read the JS object literals in assets/js/data.js as Python data.

data.js is the single source of truth for the site and is loaded directly by
the browser, so it cannot become JSON without adding a fetch to every page.
This converts it instead: a small tokeniser that walks the file, turns
single-quoted strings into JSON strings, quotes the bare keys, and drops
comments and trailing commas.
"""
import json, re


def _to_json(src: str) -> str:
    out, i, n = [], 0, len(src)
    while i < n:
        c = src[i]

        # comments
        if c == '/' and i + 1 < n and src[i + 1] == '/':
            i = src.find('\n', i)
            if i == -1: break
            continue
        if c == '/' and i + 1 < n and src[i + 1] == '*':
            end = src.find('*/', i + 2)
            i = n if end == -1 else end + 2
            continue

        # single-quoted string -> JSON string
        if c == "'":
            i += 1
            buf = []
            while i < n and src[i] != "'":
                if src[i] == '\\':
                    nxt = src[i + 1]
                    buf.append(nxt if nxt == "'" else '\\' + nxt)
                    i += 2
                    continue
                buf.append(src[i])
                i += 1
            i += 1
            out.append(json.dumps(''.join(buf)))
            continue

        # already a double-quoted string: copy verbatim
        if c == '"':
            j = i + 1
            while j < n and src[j] != '"':
                j += 2 if src[j] == '\\' else 1
            out.append(src[i:j + 1])
            i = j + 1
            continue

        # bare key -> quoted key
        m = re.match(r'([A-Za-z_$][\w$]*)\s*:', src[i:])
        if m and (not out or out[-1].strip()[-1:] in '{,'):
            out.append('"%s":' % m.group(1))
            i += m.end()
            continue

        out.append(c)
        i += 1

    txt = ''.join(out)
    txt = re.sub(r',\s*([}\]])', r'\1', txt)      # trailing commas
    return txt


def _array_after(src: str, name: str) -> str:
    start = src.index(name)
    start = src.index('[', start)
    depth, i, in_s, esc = 0, start, False, False
    while i < len(src):
        ch = src[i]
        if in_s:
            if esc: esc = False
            elif ch == '\\': esc = True
            elif ch == in_s: in_s = False
        elif ch in '"\'':
            in_s = ch
        elif ch == '[': depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                return src[start:i + 1]
        i += 1
    raise ValueError('unterminated array: ' + name)


def load(path='assets/js/data.js'):
    src = open(path, encoding='utf-8').read()
    dests = json.loads(_to_json(_array_after(src, 'const DESTINATIONS')))
    trips = json.loads(_to_json(_array_after(src, 'const EXAMPLE_TRIPS')))
    return dests, trips


if __name__ == '__main__':
    d, t = load()
    print('destinations:', len(d))
    print('trips       :', len(t))
    print('courses     :', sum(len(x['courses']) for x in d))
    print('sample      :', d[0]['name'], '|', d[0]['region'], '|', len(d[0]['courses']), 'courses')
    missing = [x['id'] for x in d if not all(k in x for k in
               ('name','region','tagline','blurb','longBlurb','season','airport','courses','lodging'))]
    print('incomplete  :', missing or 'none')
