import { ResponsiveBar } from "@nivo/bar";

const DurationTime = ({ durationTimeData }) => {
  const customColors = ["#648FFF", "#785EF0", "#DC267F", "#FE6100", "#FFB000"];

  return (
    <ResponsiveBar
      data={durationTimeData}
      keys={["Desk Stretch", "Mobility", "Meditation", "Bodyweight", "Cardio"]}
      indexBy="Date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={customColors}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendPosition: "middle",
        legendOffset: 32,
        tickValues: durationTimeData.map((data) => data.Date),
        tickTextStyle: { fontWeight: "bold" },
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "No. of Workouts",
        legendPosition: "middle",
        legendOffset: -40,
        tickTextStyle: { fontWeight: "bold" },
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
      }
    />
  );
};

export default DurationTime;
