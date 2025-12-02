import snowfall, { Types } from "@erikwatson/snowfall";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/base16/tomorrow-night.css";
import "react-tooltip/dist/react-tooltip.css";

import { useState, useEffect } from "react";

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
  isReact: boolean;
  schedule?: Types.UserSchedule;
};

function stringify(
  obj: object,
  replacer?: (number | string)[] | null,
  space?: string | number
): string {
  const jsonString = JSON.stringify(obj, replacer, space);
  return jsonString.replace(/"(\w+)":/g, "$1:");
}

function log(label: string, obj: Object) {
  console.log(label, JSON.stringify(obj));
}

export const Output = ({
  title,
  config,
  largeConfig,
  reset,
  copy,
  isMinified,
  isReact,
  schedule,
}: OutputProps) => {
  const [output, setOutput] = useState<string>(`snowfall.start()`);
  hljs.registerLanguage("javascript", javascript);

  const [snowfallDotStart, setSnowfallDotStart] =
    useState<string>(`snowfall.start()`);

  const [snowfallReact, setSnowfallReact] = useState<string>(`<Snowfall />`);

  useEffect(() => {
    const stringifiedConfig = isMinified
      ? stringify(config, null, 2)
      : stringify(largeConfig, null, 2);

    const stringifiedSchedule = stringify(schedule || {}, null, 2);

    if (stringifiedConfig.length === 2) {
      setSnowfallDotStart(`snowfall.start()`);
      setSnowfallReact(`<Snowfall />`);
    } else {
      if (schedule) {
        const str_js = `const schedule = ${stringifiedSchedule};\n\nconst config = ${stringifiedConfig};\n\nsnowfall.schedule(schedule, config);`;
        const str_react = `const schedule = ${stringifiedSchedule};\n\nconst config = ${stringifiedConfig};\n\nreturn <Snowfall schedule={schedule} config={config} />`;

        setSnowfallDotStart(str_js);
        setSnowfallReact(str_react);
      } else {
        setSnowfallDotStart(`snowfall.start(${stringifiedConfig})`);
        setSnowfallReact(`<Snowfall config={${stringifiedConfig}} />`);
      }
    }
  }, [config, isMinified, isReact, largeConfig]);

  useEffect(() => {
    setOutput(hljs.highlight(snowfallReact, { language: "jsx" }).value);
  }, [snowfallReact]);

  useEffect(() => {
    setOutput(hljs.highlight(snowfallDotStart, { language: "js" }).value);
  }, [snowfallDotStart]);

  useEffect(() => {
    if (isReact) {
      setOutput(hljs.highlight(snowfallReact, { language: "jsx" }).value);
    } else {
      setOutput(hljs.highlight(snowfallDotStart, { language: "js" }).value);
    }
  }, [isReact]);

  useEffect(() => {
    log('output', { config, largeConfig });
  }, [config, largeConfig]);

  return (
    <div className="output-wrapper">
      <div className="output">
        <div className="output-header">
          <h2>{title}</h2>
          <div>
            <Button
              onClick={() => copy(isReact ? snowfallReact : snowfallDotStart)}
              tooltip="Copy to clipboard"
            >
              <FontAwesomeIcon icon={faClone} />
            </Button>
            <Button kind="error" onClick={reset} tooltip="Reset ">
              <FontAwesomeIcon icon={faUndo} />
            </Button>
          </div>
        </div>
        <pre>
          <code
            className="js"
            id="output"
            dangerouslySetInnerHTML={{ __html: output }}
          ></code>
        </pre>
      </div>
    </div>
  );
};
