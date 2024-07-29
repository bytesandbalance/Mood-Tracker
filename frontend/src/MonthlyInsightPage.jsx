import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MonthlyInsightPage = () => {
    const { month } = useParams();
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/get_monthly_data/${month}`)
            .then(response => {
                setMonthlyData(response.data);
                drawMoodChart(response.data);
                drawEnergyLineChart(response.data);
                drawPieChart(response.data, 'diet', '#dietChart');
                drawPieChart(response.data, 'activity', '#activityChart');
                drawPieChart(response.data, 'physicalSymptoms', '#physicalSymptomsChart');
                drawSleepDurationChart(response.data);
            })
            .catch(error => console.error('Error fetching monthly data:', error));
    }, [month]);

    const drawMoodChart = (data) => {
        // Clear any existing chart
        d3.select('#moodChart').selectAll('*').remove();

        // Aggregate mood values and weights
        const aggregatedMoodValues = data.reduce((acc, entry) => {
            for (let mood in entry.moodValues) {
                if (!acc[mood]) {
                    acc[mood] = { totalValue: 0, totalWeight: 0 };
                }
                acc[mood].totalValue += entry.moodValues[mood] * entry.moodWeights[mood];
                acc[mood].totalWeight += entry.moodWeights[mood];
            }
            return acc;
        }, {});

        // Calculate weighted averages
        const chartData = Object.keys(aggregatedMoodValues).map(key => ({
            mood: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
            value: aggregatedMoodValues[key].totalValue / aggregatedMoodValues[key].totalWeight
        }));

        // Set dimensions and margins for the chart
        const margin = { top: 20, right: 30, bottom: 60, left: 50 },
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // Append SVG object to the div
        const svg = d3.select("#moodChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "chart-svg")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis
        const x = d3.scaleBand()
            .domain(chartData.map(d => d.mood))
            .range([0, width])
            .padding(0.1);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
            .selectAll("text")
            .attr("class", "axis-label")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-45)");

        // Add X axis label
        svg.append("text")
            .attr("class", "axis-label")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .text("Mood");

        // Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(chartData, d => d.value)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y).ticks(5))
            .selectAll("text")
            .attr("class", "axis-label");

        // Add Y axis label
        svg.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("text-anchor", "middle")
            .text("Weighted Average");

        // Bars
        svg.selectAll(".bar")
            .data(chartData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.mood))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", "steelblue");

        // Add hover effect
        svg.selectAll(".bar")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "orange");
            })
            .on("mouseout", function (event, d) {
                d3.select(this).attr("fill", "steelblue");
            });
    };

    const drawSleepDurationChart = (data) => {
        // Clear any existing chart
        d3.select('#sleepDurationChart').selectAll('*').remove();

        // Prepare the data
        const barData = data.map(entry => ({
            date: new Date(entry.date),
            sleepDuration: entry.sleepDuration
        }));

        // Set dimensions and margins for the chart
        const margin = { top: 20, right: 30, bottom: 60, left: 50 },
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // Append SVG object to the div
        const svg = d3.select("#sleepDurationChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "chart-svg")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis
        const x = d3.scaleBand()
            .domain(barData.map(d => d.date))
            .range([0, width])
            .padding(0.1);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")).tickSize(0).tickPadding(10))
            .selectAll("text")
            .attr("class", "axis-label")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-45)");

        // Add X axis label
        svg.append("text")
            .attr("class", "axis-label")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .text("Date");

        // Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(barData, d => d.sleepDuration)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y).ticks(5))
            .selectAll("text")
            .attr("class", "axis-label");

        // Add Y axis label
        svg.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("text-anchor", "middle")
            .text("Sleep Duration (hours)");

        // Bars
        svg.selectAll(".bar")
            .data(barData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.date))
            .attr("y", d => y(d.sleepDuration))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.sleepDuration))
            .attr("fill", "steelblue");

        // Add hover effect
        svg.selectAll(".bar")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "orange");
            })
            .on("mouseout", function (event, d) {
                d3.select(this).attr("fill", "steelblue");
            });
    };

    const drawEnergyLineChart = (data) => {
        // Clear any existing chart
        d3.select('#energyChart').selectAll('*').remove();

        // Prepare the data
        const lineData = data.map(entry => ({
            date: new Date(entry.date),
            energyLevel: entry.energyLevel
        }));

        // Set dimensions and margins for the chart
        const margin = { top: 20, right: 30, bottom: 60, left: 50 },
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // Append SVG object to the div
        const svg = d3.select("#energyChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "chart-svg")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis
        const x = d3.scaleTime()
            .domain(d3.extent(lineData, d => d.date))
            .range([0, width]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")).tickSize(0).tickPadding(10))
            .selectAll("text")
            .attr("class", "axis-label")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-45)");

        // Add X axis label
        svg.append("text")
            .attr("class", "axis-label")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .text("Date");

        // Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(lineData, d => d.energyLevel)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y).ticks(5))
            .selectAll("text")
            .attr("class", "axis-label");

        // Add Y axis label
        svg.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("text-anchor", "middle")
            .text("Energy Level");

        // Line
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.energyLevel));

        svg.append("path")
            .datum(lineData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);
    };

    const drawPieChart = (data, key, selector) => {
        // Clear any existing chart
        d3.select(selector).selectAll('*').remove();

        // Aggregate the data
        const aggregatedData = data.reduce((acc, entry) => {
            if (!acc[entry[key]]) {
                acc[entry[key]] = 0;
            }
            acc[entry[key]] += 1;
            return acc;
        }, {});

        // Convert aggregatedData into an array of objects
        const chartData = Object.keys(aggregatedData).map(key => ({
            label: key,
            value: aggregatedData[key]
        }));

        // Set dimensions and margins for the chart
        const width = 600,
            height = 600,
            radius = Math.min(width, height) / 2;

        // Append SVG object to the div
        const svg = d3.select(selector)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "chart-svg")
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        // Set the color scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Pie chart
        const pie = d3.pie()
            .value(d => d.value)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Add arcs
        svg.selectAll('arc')
            .data(pie(chartData))
            .enter().append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.label))
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 1);

        // Add labels
        svg.selectAll('text')
            .data(pie(chartData))
            .enter().append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .style('text-anchor', 'middle')
            .text(d => d.data.label);
    };

    return (
        <div>
            <h1>Monthly Insight for {month}</h1>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <div className="chart-title">Mood Chart</div>
                    <div id="moodChart"></div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Energy Level Chart</div>
                    <div id="energyChart"></div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Diet Chart</div>
                    <div id="dietChart"></div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Activity Chart</div>
                    <div id="activityChart"></div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Physical Symptoms Chart</div>
                    <div id="physicalSymptomsChart"></div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Sleep Duration Chart</div>
                    <div id="sleepDurationChart"></div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyInsightPage;
