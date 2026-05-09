import React from "react";
import { rewardRules } from "../constants/uiConstants";
import "./styles/RulesLegend.css";

export default function RulesLegend() {
  return (
    <div className="dashboard-legend-box">
      <strong className="dashboard-legend-title">Reward Rules</strong>
      <div className="dashboard-legend-grid">
        {rewardRules.map((rule) => (
          <div key={rule.range} className="dashboard-legend-chip">
            <span className="dashboard-legend-dot" style={{ background: rule.color }} />
            <span className="dashboard-legend-range">{rule.range}</span>
            <span className="dashboard-legend-points" style={{ color: rule.color }}>
              {rule.pointsDescription}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}