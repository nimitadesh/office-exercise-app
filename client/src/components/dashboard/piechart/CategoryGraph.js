import { ResponsivePie } from "@nivo/pie";
import { Box } from "@chakra-ui/react";

const customColors = ["#648FFF", "#785EF0", "#DC267F", "#FE6100", "#FFB000"];

export const CategoryGraph = ({ categoryData }) => (
  <ResponsivePie
    data={categoryData}
    margin={{ top: 40, right: 120, bottom: 40, left: 120 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    colors={customColors}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={30}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={categoryData.map((dataItem, index) => ({
      match: { id: dataItem.id },
      id: customColors[index % customColors.length], // Assign color from customColors
    }))}
  />
);
