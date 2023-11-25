// Read the JSON data from the "data.json" file
d3.json("data.json")
  .then(function(data) {
    // Extract the activities data
    const activities = data.atividades;

    // Create an object to store the total time spent on each activity
    const activityTimeMap = {};

    // Calculate the total time spent on each activity
    activities.forEach(function(activity) {
      const activityName = activity.atividade;
      const activityTime = parseInt(activity.tempo_gasto);

      if (activityTimeMap[activityName]) {
        activityTimeMap[activityName] += activityTime;
      } else {
        activityTimeMap[activityName] = activityTime;
      }
    });

    // Convert the activityTimeMap object to an array of objects
    const activityData = Object.entries(activityTimeMap).map(([activity, time]) => ({ activity, time }));

    // Sort the activity data by time spent in descending order
    activityData.sort((a, b) => b.time - a.time);

    // Set up the dimensions and margins for the chart
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 1200 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    // Create an SVG element for the chart
    const svg = d3.select("#chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create a scale for the x-axis (activity names)
    const x = d3.scaleBand()
      .domain(activityData.map(d => d.activity))
      .range([0, width])
      .padding(0.1);

    // Create a scale for the y-axis (time spent in minutes)
    const y = d3.scaleLinear()
      .domain([0, d3.max(activityData, d => d.time)])
      .nice()
      .range([height, 0]);

    // Create the x-axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Create the y-axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Create the bars in the chart
    svg.selectAll(".bar")
      .data(activityData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.activity))
      .attr("y", d => y(d.time))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.time));

    // Add labels for the bars
    svg.selectAll(".bar-label")
      .data(activityData)
      .enter().append("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d.activity) + x.bandwidth() / 2)
      .attr("y", d => y(d.time) - 10)
      .attr("text-anchor", "middle")
      .text(d => d.time + " min");

    // Add a title to the chart
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .text("Time Spent on Activities");

  })
  .catch(function(error) {
    console.error("Error loading data: " + error);
  });