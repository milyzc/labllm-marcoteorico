# Marco teórico · uso seguro de IA

Slides HTML interactivas con seis enfoques de IA. Cada enfoque es independiente y se puede dar por separado.

| Deck | Enfoque | Interactivo |
|---|---|---|
| `01-team.html` | IA en un equipo: política, clasificación de datos, shadow AI, revisión humana, incidentes | Clasificador de datos (arrastrar y soltar) |
| `02-usuarios.html` | IA para usuarios no técnicos: tokens, ahorrar, qué no pegar, alucinaciones | Contador de tokens, costo de conversaciones largas, antes/después |
| `03-dev.html` | IA para un dev con Claude Code: jerarquía de CLAUDE.md y de settings, rules, skills, commands, hooks, permisos | Capas de memoria, simulador de permisos, ejemplos |
| `04-cicd.html` | IA en CI/CD: agente de review de MR en GitLab | Pipeline paso a paso, `.gitlab-ci.yml` anotado |
| `05-modelo.html` | IA desde el modelo: preentrenamiento, fine-tuning, LoRA, alineación; memorización, envenenamiento, modelos de terceros | Mini-modelo de próxima palabra que se "entrena" con ejemplos (normales, envenenados, puerta trasera), ayuda para elegir prompt, RAG o fine-tuning |
| `06-componentes.html` | IA entre componentes: system prompt, RAG y bases vectoriales, herramientas, agentes, terceros; OWASP LLM01 a LLM10 y los labs | Mapa de la arquitectura con los riesgos por pieza |

## Uso

Sin dependencias ni build. Abrí `index.html` en el navegador, o serví la carpeta:

```bash
python3 -m http.server 8080   # http://127.0.0.1:8080
```

Atajos: `←` `→` navegar (incluye pasos dentro de una slide), `N` notas del presentador, `T` tema claro/oscuro, `F` pantalla completa, `?` ayuda. La URL guarda la slide (`03-dev.html#5`). Para exportar a PDF, usá imprimir del navegador.

Los labs prácticos están en `labllm` (LLM01, 02, 05, 09) y `labllm2` (LLM03, 04, 06, 07, 08, 10).

## Fuentes

- OWASP Top 10 for LLM Applications 2025: https://genai.owasp.org/llm-top-10/
- Prompt, RAG o fine-tuning: [OpenAI · Optimizing LLM Accuracy](https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy), [OpenAI · Supervised fine-tuning](https://developers.openai.com/api/docs/guides/supervised-fine-tuning), [Ovadia et al., 2023](https://arxiv.org/abs/2312.05934)
- Claude Code: [memoria y rules](https://code.claude.com/docs/en/memory), [skills](https://code.claude.com/docs/en/skills), [hooks](https://code.claude.com/docs/en/hooks), [permisos](https://code.claude.com/docs/en/permissions), [settings](https://code.claude.com/docs/en/settings), [GitLab CI/CD](https://code.claude.com/docs/en/gitlab-ci-cd)
