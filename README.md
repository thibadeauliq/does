# does

A fast personal task runner — define repeatable scripts once in `.does.yaml`, run them anywhere.

```bash
npm install -g does-runner

does dev
does test:unit
does deploy:staging
does build test:unit --parallel
```

## Features
- Zero-config: drop `.does.yaml` at project root
- Multi-step tasks (list of commands)
- Per-task env vars
- `--parallel` flag for concurrent tasks
- `does --list` to show all available tasks
- Walks up directory tree to find nearest config

## Install
```bash
npm install -g does-runner
```

## .does.yaml example
```yaml
tasks:
  dev:
    description: Start dev server
    run: npm run dev

  test:unit:
    run: jest --watch

  deploy:staging:
    env:
      NODE_ENV: production
    run:
      - npm run build
      - rsync -av dist/ user@host:/var/www
```

## License
MIT
