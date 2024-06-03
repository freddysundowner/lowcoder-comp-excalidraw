import {
  UICompBuilder,
  Section,
  withExposingConfigs,
  AutoHeightControl,
  withDefault
} from "lowcoder-sdk";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useState } from "react";
import { useResizeDetector } from "react-resize-detector";

let ExcalidrawCompBase = (function () {
  const childrenMap = {
    autoHeight: withDefault(AutoHeightControl, "auto"),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const [dimensions, setDimensions] = useState({ width: 480, height: 280 });
    const {
      width,
      height,
      ref: conRef,
    } = useResizeDetector({
      onResize: () => {
        const container = conRef.current;
        if (!container || !width || !height) return;

        if (props.autoHeight) {
          setDimensions({
            width,
            height: dimensions.height,
          });
          return;
        }

        setDimensions({
          width,
          height,
        });
      },
    });
    return (
      <div
        ref={conRef}
        style={{
          height: `100%`,
          width: `100%`,
        }}
      >
        <div style={{ height: dimensions.height, width: dimensions.width }}>
          <Excalidraw />
        </div>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Styles">
            {children.autoHeight.getPropertyView()}
          </Section>
        </>
      );
    })
    .build();
})();

ExcalidrawCompBase = class extends ExcalidrawCompBase {
  autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }
};

export default withExposingConfigs(ExcalidrawCompBase, []);
