import { useEffect } from 'react';
import './snowfall.css';
import snowfall, { DEFAULT_CONTAINER_ID, Types } from '@erikwatson/snowfall';

type SnowfallProps = {
  config: Types.UserConfig;
};

export const Snowfall = ({ config }: SnowfallProps) => {
  useEffect(() => {
    snowfall.start();
  }, []);

  useEffect(() => {
    // the user may change the container id, but we're always going to render _our_ component to the default container
    const copy = { ...config, attachTo: DEFAULT_CONTAINER_ID };
    snowfall.restart(copy);
  }, [config]);

  return (
    <>
      <div id='snowfall'></div>
      <div id="content"></div>
    </>
  );
};
