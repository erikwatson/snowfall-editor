import { Types } from "@erikwatson/snowfall";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/base16/tomorrow-night.css";
import "react-tooltip/dist/react-tooltip.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

import "./output.css";
import { Button } from "../button/button";
import { faClone, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type OutputProps = {
  title: string;
  config: Types.UserConfig;
  largeConfig: Types.UserConfig;
  reset: () => void;
  copy: (value: string) => void;
  isMinified: boolean;
};

function stringify(obj: object, space: number | string = 2): string {
  return JSON.stringify(obj, null, space) ?? "{}";
}

export const Output = ({
  title,
  config,
  largeConfig,
  reset,
  copy,
  isMinified,
}: OutputProps) => {
  const schedule = useSelector((state: RootState) => state.userSchedule);

  const exportMode = useSelector(
    (state: RootState) =>
      state.editorSettings.exportMode ??
      (state.editorSettings.isReact ? "jsx" : "js"),
  );

  const [output, setOutput] = useState("");
  const [plainOutput, setPlainOutput] = useState("");

  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("xml", xml);
  }, []);

  useEffect(() => {
    const selectedConfig = isMinified ? config : largeConfig;
    const hasConfig = Object.keys(selectedConfig).length > 0;
    const configCode = stringify(selectedConfig);

    // A schedule is applied only when enabled and both dates are complete.
    // Otherwise, snowfall runs continuously.
    const hasSchedule =
      schedule.enabled &&
      schedule.from.month !== null &&
      schedule.from.day !== null &&
      schedule.to.month !== null &&
      schedule.to.day !== null;

    const scheduleCode = hasSchedule
      ? stringify({
          from: {
            month: schedule.from.month! + 1,
            day: schedule.from.day!,
          },
          to: {
            month: schedule.to.month! + 1,
            day: schedule.to.day!,
          },
        })
      : "";

    const isReact = exportMode === "jsx" || exportMode === "tsx";
    const isTypeScript = exportMode === "ts" || exportMode === "tsx";

    let code: string;
    let language = isTypeScript ? "typescript" : "javascript";

    if (exportMode === "html") {
      language = "xml";

      const scriptCode = hasSchedule
        ? `const schedule = ${scheduleCode};

const config = ${configCode};

snowfall.schedule(schedule, config);`
        : hasConfig
          ? `snowfall.start(${configCode});`
          : "snowfall.start();";

      const indentedScriptCode = scriptCode
        .split("\n")
        .map((line) => (line ? `    ${line}` : line))
        .join("\n");

      code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snowfall</title>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/@erikwatson/snowfall@4/dist/index.min.js"></script>
  <script>
${indentedScriptCode}
  </script>
</body>
</html>`;
    } else if (isReact) {
      // React projects use the dedicated React wrapper package.
      const imports = isTypeScript
        ? `import { Snowfall${
            hasConfig ? ", type UserConfig" : ""
          }${hasSchedule ? ", type UserSchedule" : ""} } from "@erikwatson/react-snowfall";`
        : `import { Snowfall } from "@erikwatson/react-snowfall";`;

      const declarations: string[] = [];

      if (hasConfig) {
        declarations.push(
          isTypeScript
            ? `const config: UserConfig = ${configCode};`
            : `const config = ${configCode};`,
        );
      }

      if (hasSchedule) {
        declarations.push(
          isTypeScript
            ? `const schedule: UserSchedule = ${scheduleCode};`
            : `const schedule = ${scheduleCode};`,
        );
      }

      const declarationCode = declarations.join("\n\n");

      const props = [
        hasConfig ? "config={config}" : "",
        hasSchedule ? "schedule={schedule}" : "",
      ]
        .filter(Boolean)
        .join(" ");

      const componentCode = `export default function SnowfallExample() {
  return <Snowfall${props ? ` ${props}` : ""} />;
}`;

      code = [
        imports,
        declarationCode ? `\n\n${declarationCode}` : "",
        `\n\n${componentCode}`,
      ].join("");
    } else {
      // Regular JS and TS continue to use the core snowfall package.
      const imports = isTypeScript
        ? `import snowfall, { type UserConfig${
            hasSchedule ? ", type UserSchedule" : ""
          } } from "@erikwatson/snowfall";`
        : `import snowfall from "@erikwatson/snowfall";`;

      const declarations: string[] = [];

      if (hasConfig) {
        declarations.push(
          isTypeScript
            ? `const config: UserConfig = ${configCode};`
            : `const config = ${configCode};`,
        );
      }

      if (hasSchedule) {
        declarations.push(
          isTypeScript
            ? `const schedule: UserSchedule = ${scheduleCode};`
            : `const schedule = ${scheduleCode};`,
        );
      }

      const declarationCode = declarations.join("\n\n");

      const invocation = hasSchedule
        ? `snowfall.schedule(schedule, ${hasConfig ? "config" : "{}"});`
        : hasConfig
          ? "snowfall.start(config);"
          : "snowfall.start();";

      code = [
        imports,
        declarationCode ? `\n\n${declarationCode}` : "",
        `\n\n${invocation}`,
      ].join("");
    }

    setPlainOutput(code);
    setOutput(hljs.highlight(code, { language }).value);
  }, [config, largeConfig, isMinified, schedule, exportMode]);

  return (
    <div className="output-wrapper">
      <div className="output">
        <div className="output-header">
          <h2>{title}</h2>
          <div>
            <Button
              onClick={() => copy(plainOutput)}
              tooltip="Copy to clipboard"
            >
              <FontAwesomeIcon icon={faClone} />
            </Button>

            <Button kind="error" onClick={reset} tooltip="Reset">
              <FontAwesomeIcon icon={faUndo} />
            </Button>
          </div>
        </div>

        <pre>
          <code
            className={exportMode}
            id="output"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </pre>
      </div>
    </div>
  );
};
