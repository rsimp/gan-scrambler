import React from "react";

import styles from "app/setup/styles.module.css";

export const Setup = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <button
        onClick={async (e) => {
          const device = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: "GAN" }],
          });
          const server = await device.gatt?.connect();
          if (server) {
            const services = await server.getPrimaryServices();
          }
        }}
      >
        Click me
      </button>
    </div>
  );
};
