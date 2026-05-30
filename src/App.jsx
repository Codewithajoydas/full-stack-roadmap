import { useState, useEffect, useRef } from "react";
import { phases } from "./data/phases";
import { difficultyColors } from "./const/difficultyColors";
import { timeEstimates } from "./const/timeEstimates";
export default function App() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fsd-completed") || "{}");
    } catch {
      return {};
    }
  });
  const [view, setView] = useState("roadmap");
  const topicRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("fsd-completed", JSON.stringify(completed));
    } catch {}
  }, [completed]);

  const totalTopics = phases.reduce(
    (sum, p) => sum + p.sections.reduce((s, sec) => s + sec.topics.length, 0),
    0,
  );
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalTopics) * 100);

  const filteredPhases =
    search.trim() === ""
      ? phases
      : phases
          .map((p) => ({
            ...p,
            sections: p.sections
              .map((s) => ({
                ...s,
                topics: s.topics.filter(
                  (t) =>
                    t.name.toLowerCase().includes(search.toLowerCase()) ||
                    t.what.toLowerCase().includes(search.toLowerCase()),
                ),
              }))
              .filter((s) => s.topics.length > 0),
          }))
          .filter((p) => p.sections.length > 0);

  const toggleComplete = (key) => {
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openTopic = (topic, phaseColor) => {
    setActiveTopic({ ...topic, color: phaseColor });
    setTimeout(
      () => topicRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#080c14",
        color: "#e2e8f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(8,12,20,0.95)",
          borderBottom: "1px solid rgba(0,212,255,0.12)",
          backdropFilter: "blur(12px)",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 0",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              style={{
                fontSize: 11,
                color: "#00d4ff",
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              FULL STACK
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: -0.5,
                color: "#fff",
              }}
            >
              Developer Roadmap
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {["roadmap", "progress", "plan"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: view === v ? "#00d4ff" : "rgba(255,255,255,0.1)",
                  background:
                    view === v ? "rgba(0,212,255,0.1)" : "transparent",
                  color: view === v ? "#00d4ff" : "#94a3b8",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "inherit",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {v}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics..."
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: 4,
              padding: "6px 14px",
              color: "#e2e8f0",
              fontSize: 13,
              fontFamily: "inherit",
              width: 200,
              outline: "none",
            }}
          />

          <div style={{ textAlign: "right", minWidth: 80 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#00d4ff" }}>
              {progressPct}%
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {completedCount}/{totalTopics}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 2,
            background: "rgba(255,255,255,0.05)",
            margin: "0 24px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPct}%`,
              background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </header>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "32px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {view === "plan" && (
          <div>
            <h2
              style={{
                fontSize: 24,
                color: "#00d4ff",
                marginBottom: 24,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              📅 Weekly Study Plan
            </h2>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                {
                  weeks: "Weeks 1–4",
                  focus:
                    "Phases 1-3: Computer Fundamentals, Linux Mastery, Git",
                  goal: "Solid foundation — understand what's happening under the hood",
                },
                {
                  weeks: "Weeks 5–8",
                  focus: "Phases 4-5: HTML & CSS Mastery",
                  goal: "Build pixel-perfect, accessible, responsive interfaces",
                },
                {
                  weeks: "Weeks 9–16",
                  focus: "Phases 6-7: JavaScript & TypeScript Mastery",
                  goal: "Deep JS knowledge — the most important investment you'll make",
                },
                {
                  weeks: "Weeks 17–22",
                  focus: "Phases 8-9: DSA & Frontend Engineering",
                  goal: "Algorithm skills for interviews + production frontend patterns",
                },
                {
                  weeks: "Weeks 23–28",
                  focus: "Phases 10-11: React & Backend Engineering",
                  goal: "Build full-stack applications from frontend to API",
                },
                {
                  weeks: "Weeks 29–34",
                  focus: "Phases 12-13: Databases & Security",
                  goal: "Production-ready data layer and security practices",
                },
                {
                  weeks: "Weeks 35–38",
                  focus: "Phases 14-15: Testing & DevOps",
                  goal: "Quality guarantees and deployment automation",
                },
                {
                  weeks: "Weeks 39–44",
                  focus: "Phases 16-18: Cloud, Architecture & System Design",
                  goal: "Scale and architect real-world systems",
                },
                {
                  weeks: "Weeks 45–50",
                  focus:
                    "Phases 19-22: Observability, Performance, AI, Productivity",
                  goal: "Elite-level operational and modern AI engineering skills",
                },
                {
                  weeks: "Weeks 51+",
                  focus: "Phases 23-25: Tools, Projects, Leadership (ongoing)",
                  goal: "Build portfolio projects, develop leadership skills, contribute to open source",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr 1fr",
                    gap: 16,
                    padding: "16px 20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 6,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ color: "#00d4ff", fontSize: 13, fontWeight: 700 }}
                  >
                    {row.weeks}
                  </div>
                  <div style={{ color: "#e2e8f0", fontSize: 13 }}>
                    {row.focus}
                  </div>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: 12,
                      fontStyle: "italic",
                    }}
                  >
                    {row.goal}
                  </div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontSize: 24,
                color: "#00d4ff",
                marginTop: 48,
                marginBottom: 24,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              🎯 Interview Preparation Path
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {[
                {
                  title: "Coding Interviews",
                  items: [
                    "Phase 8: DSA — LeetCode 150 core problems",
                    "Focus: Arrays, Strings, Trees, Graphs, DP",
                    "Practice: 2 problems/day for 3 months",
                    "Tools: LeetCode, NeetCode, AlgoExpert",
                  ],
                },
                {
                  title: "System Design",
                  items: [
                    "Phase 18: System Design mastery",
                    "Study: DDIA + System Design Interview books",
                    "Practice: Design 20 different systems",
                    "Mock interviews: Pramp, Interviewing.io",
                  ],
                },
                {
                  title: "Behavioral",
                  items: [
                    "STAR method for every experience",
                    "Prepare 10 impactful stories from projects",
                    "Leadership, conflict, failure examples",
                    "Research company engineering blog",
                  ],
                },
                {
                  title: "Full Stack Technical",
                  items: [
                    "Phases 6, 10, 11: JS, React, Backend deep dives",
                    "Build 2-3 polished portfolio projects",
                    "Deploy everything publicly",
                    "Open source contributions",
                  ],
                },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(0,212,255,0.1)",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      color: "#00d4ff",
                      fontWeight: 700,
                      marginBottom: 12,
                      textTransform: "uppercase",
                      fontSize: 12,
                      letterSpacing: 1,
                    }}
                  >
                    {card.title}
                  </div>
                  {card.items.map((item, j) => (
                    <div
                      key={j}
                      style={{
                        color: "#94a3b8",
                        fontSize: 12,
                        padding: "4px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      → {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "progress" && (
          <div>
            <h2
              style={{
                fontSize: 24,
                color: "#00d4ff",
                marginBottom: 24,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              📊 Your Progress
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 16,
              }}
            >
              {phases.map((phase) => {
                const phaseTopics = phase.sections.flatMap((s) => s.topics);
                const phaseCompleted = phaseTopics.filter(
                  (t) => completed[`${phase.id}-${t.name}`],
                ).length;
                const pct = Math.round(
                  (phaseCompleted / phaseTopics.length) * 100,
                );
                return (
                  <div
                    key={phase.id}
                    style={{
                      padding: "16px 20px",
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${pct === 100 ? phase.color : "rgba(255,255,255,0.07)"}`,
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onClick={() => {
                      setView("roadmap");
                      setActivePhase(
                        activePhase === phase.id ? null : phase.id,
                      );
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ fontSize: 13 }}>
                        {phase.emoji} Phase {phase.id}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: pct === 100 ? phase.color : "#64748b",
                          fontWeight: 700,
                        }}
                      >
                        {pct}%
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "#e2e8f0",
                        marginBottom: 10,
                      }}
                    >
                      {phase.title}
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 2,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: phase.color,
                          borderRadius: 2,
                          transition: "width 0.5s",
                        }}
                      />
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#475569", marginTop: 6 }}
                    >
                      {phaseCompleted}/{phaseTopics.length} topics · ~
                      {timeEstimates[phase?.id??0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "roadmap" && (
          <div>
            {/* Phase overview grid */}
            {!activePhase && search === "" && (
              <div>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: 6,
                      color: "#00d4ff",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Complete Skill Tree
                  </div>
                  <h1
                    style={{
                      fontSize: 42,
                      fontWeight: 800,
                      letterSpacing: -1,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {phases.length } Phases to World-Class
                  </h1>
                  <p style={{ color: "#64748b", marginTop: 12, fontSize: 14 }}>
                    ~{completedCount}/{totalTopics} topics mastered · Click any
                    phase to explore
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: 12,
                  }}
                >
                  {phases.map((phase) => {
                    const phaseTopics = phase.sections.flatMap((s) => s.topics);
                    const phaseCompleted = phaseTopics.filter(
                      (t) => completed[`${phase.id}-${t.name}`],
                    ).length;
                    const pct = Math.round(
                      (phaseCompleted / phaseTopics.length) * 100,
                    );
                    return (
                      <button
                        key={phase.id}
                        onClick={() => setActivePhase(phase.id)}
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: `1px solid rgba(${phase.color
                            .slice(1)
                            .match(/.{2}/g)
                            .map((x) => parseInt(x, 16))
                            .join(",")},0.25)`,
                          borderRadius: 8,
                          padding: "18px 20px",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                          fontFamily: "inherit",
                          color: "#e2e8f0",
                          "&:hover": { background: "rgba(255,255,255,0.05)" },
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <div style={{ fontSize: 28, marginBottom: 8 }}>
                            {phase.emoji}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: pct > 0 ? phase.color : "#475569",
                              fontWeight: 700,
                            }}
                          >
                            {pct}%
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#64748b",
                            marginBottom: 4,
                            letterSpacing: 1,
                          }}
                        >
                          PHASE {phase.id}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#e2e8f0",
                            marginBottom: 8,
                          }}
                        >
                          {phase.title}
                        </div>
                        <div
                          style={{
                            height: 2,
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 1,
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${pct}%`,
                              background: phase.color,
                              borderRadius: 1,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#475569",
                            marginTop: 6,
                          }}
                        >
                          {phaseTopics.length} topics ·{" "}
                          {timeEstimates[phase.id]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Phase detail */}
            {(activePhase || search) && (
              <div>
                {activePhase && !search && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 32,
                    }}
                  >
                    <button
                      onClick={() => {
                        setActivePhase(null);
                        setActiveTopic(null);
                      }}
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#94a3b8",
                        cursor: "pointer",
                        padding: "6px 16px",
                        borderRadius: 4,
                        fontFamily: "inherit",
                        fontSize: 12,
                      }}
                    >
                      ← Back
                    </button>
                    {(() => {
                      const phase = phases.find((p) => p.id === activePhase);
                      return (
                        <div>
                          <span style={{ fontSize: 20 }}>{phase.emoji}</span>
                          <span
                            style={{
                              marginLeft: 10,
                              fontSize: 18,
                              fontWeight: 700,
                              color: phase.color,
                            }}
                          >
                            {phase.title}
                          </span>
                          <span
                            style={{
                              marginLeft: 8,
                              fontSize: 12,
                              color: "#475569",
                            }}
                          >
                            Phase {phase.id} · ~{timeEstimates[phase.id]}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: activeTopic ? "1fr 1fr" : "1fr",
                    gap: 24,
                    alignItems: "start",
                  }}
                >
                  {/* Topics list */}
                  <div>
                    {filteredPhases
                      .filter((p) => !activePhase || p.id === activePhase)
                      .map((phase) => (
                        <div key={phase.id} style={{ marginBottom: 32 }}>
                          {!activePhase && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 16,
                                cursor: "pointer",
                              }}
                              onClick={() => setActivePhase(phase.id)}
                            >
                              <span style={{ fontSize: 18 }}>
                                {phase.emoji}
                              </span>
                              <span
                                style={{
                                  fontSize: 16,
                                  fontWeight: 700,
                                  color: phase.color,
                                }}
                              >
                                Phase {phase.id}: {phase.title}
                              </span>
                            </div>
                          )}
                          {phase.sections.map((section) => (
                            <div
                              key={section.title}
                              style={{ marginBottom: 20 }}
                            >
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "#475569",
                                  letterSpacing: 2,
                                  textTransform: "uppercase",
                                  marginBottom: 10,
                                  paddingBottom: 6,
                                  borderBottom:
                                    "1px solid rgba(255,255,255,0.05)",
                                }}
                              >
                                {section.title}
                              </div>
                              <div style={{ display: "grid", gap: 6 }}>
                                {section.topics.map((topic) => {
                                  const key = `${phase.id}-${topic.name}`;
                                  const done = completed[key];
                                  const isActive =
                                    activeTopic?.name === topic.name;
                                  return (
                                    <div
                                      key={topic.name}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "10px 14px",
                                        background: isActive
                                          ? `rgba(${phase.color
                                              .slice(1)
                                              .match(/.{2}/g)
                                              .map((x) => parseInt(x, 16))
                                              .join(",")},0.1)`
                                          : "rgba(255,255,255,0.02)",
                                        border: `1px solid ${isActive ? phase.color : "rgba(255,255,255,0.06)"}`,
                                        borderRadius: 6,
                                        cursor: "pointer",
                                        transition: "all 0.15s",
                                      }}
                                    >
                                      <button
                                        onClick={() => toggleComplete(key)}
                                        style={{
                                          width: 18,
                                          height: 18,
                                          borderRadius: 3,
                                          border: `2px solid ${done ? phase.color : "rgba(255,255,255,0.2)"}`,
                                          background: done
                                            ? phase.color
                                            : "transparent",
                                          cursor: "pointer",
                                          flexShrink: 0,
                                          padding: 0,
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          color: "#000",
                                          fontSize: 10,
                                        }}
                                      >
                                        {done ? "✓" : ""}
                                      </button>

                                      <div
                                        style={{ flex: 1 }}
                                        onClick={() =>
                                          openTopic(topic, phase.color)
                                        }
                                      >
                                        <div
                                          style={{
                                            fontSize: 13,
                                            color: done ? "#475569" : "#e2e8f0",
                                            fontWeight: 500,
                                            textDecoration: done
                                              ? "line-through"
                                              : "none",
                                          }}
                                        >
                                          {topic.name}
                                        </div>
                                        <div
                                          style={{
                                            fontSize: 11,
                                            color: "#475569",
                                            marginTop: 2,
                                          }}
                                        >
                                          {topic.what.slice(0, 80)}…
                                        </div>
                                      </div>

                                      <div
                                        style={{
                                          fontSize: 10,
                                          padding: "2px 8px",
                                          borderRadius: 10,
                                          background: `${difficultyColors[topic.difficulty]}22`,
                                          color:
                                            difficultyColors[topic.difficulty],
                                          flexShrink: 0,
                                        }}
                                      >
                                        {topic.difficulty}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>

                  {/* Topic detail panel */}
                  {activeTopic && (
                    <div
                      ref={topicRef}
                      style={{
                        position: "sticky",
                        top: 90,
                        background: "rgba(8,12,20,0.98)",
                        border: `1px solid ${activeTopic.color}44`,
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background: `${activeTopic.color}18`,
                          padding: "20px 24px",
                          borderBottom: `1px solid ${activeTopic.color}33`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                color: activeTopic.color,
                                letterSpacing: 2,
                                textTransform: "uppercase",
                                marginBottom: 6,
                              }}
                            >
                              Topic Deep Dive
                            </div>
                            <div
                              style={{
                                fontSize: 22,
                                fontWeight: 800,
                                color: "#fff",
                              }}
                            >
                              {activeTopic.name}
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              padding: "4px 12px",
                              borderRadius: 12,
                              background: `${difficultyColors[activeTopic.difficulty]}22`,
                              color: difficultyColors[activeTopic.difficulty],
                              border: `1px solid ${difficultyColors[activeTopic.difficulty]}44`,
                            }}
                          >
                            {activeTopic.difficulty}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          padding: "20px 24px",
                          overflow: "auto",
                          maxHeight: "70vh",
                        }}
                      >
                        {[
                          {
                            label: "What It Is",
                            content: activeTopic.what,
                            icon: "📖",
                          },
                          {
                            label: "Why It Matters",
                            content: activeTopic.why,
                            icon: "💡",
                          },
                          {
                            label: "Prerequisites",
                            content: activeTopic.prereqs,
                            icon: "🔑",
                          },
                          {
                            label: "Real-World Usage",
                            content: activeTopic.realWorld,
                            icon: "🌐",
                          },
                          {
                            label: "Common Mistakes",
                            content: activeTopic.mistakes,
                            icon: "⚠️",
                          },
                        ].map((item) => (
                          <div key={item.label} style={{ marginBottom: 18 }}>
                            <div
                              style={{
                                fontSize: 11,
                                color: activeTopic.color,
                                letterSpacing: 1,
                                textTransform: "uppercase",
                                marginBottom: 6,
                              }}
                            >
                              {item.icon} {item.label}
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                color: "#cbd5e1",
                                lineHeight: 1.7,
                                paddingLeft: 8,
                                borderLeft: `2px solid ${activeTopic.color}44`,
                              }}
                            >
                              {item.content}
                            </div>
                          </div>
                        ))}

                        <div style={{ marginBottom: 18 }}>
                          <div
                            style={{
                              fontSize: 11,
                              color: activeTopic.color,
                              letterSpacing: 1,
                              textTransform: "uppercase",
                              marginBottom: 8,
                            }}
                          >
                            📚 Best Resources
                          </div>
                          {activeTopic.resources.map((r, i) => (
                            <div
                              key={i}
                              style={{
                                fontSize: 12,
                                color: "#94a3b8",
                                padding: "4px 0 4px 12px",
                                borderLeft: `2px solid ${activeTopic.color}33`,
                              }}
                            >
                              → {r}
                            </div>
                          ))}
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: activeTopic.color,
                              letterSpacing: 1,
                              textTransform: "uppercase",
                              marginBottom: 8,
                            }}
                          >
                            🏋️ Practice Exercises
                          </div>
                          {activeTopic.practice.map((p, i) => (
                            <div
                              key={i}
                              style={{
                                fontSize: 12,
                                color: "#94a3b8",
                                padding: "6px 12px",
                                marginBottom: 6,
                                background: `${activeTopic.color}0d`,
                                borderRadius: 4,
                                borderLeft: `3px solid ${activeTopic.color}`,
                              }}
                            >
                              {p}
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => setActiveTopic(null)}
                          style={{
                            marginTop: 20,
                            width: "100%",
                            padding: "10px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#94a3b8",
                            cursor: "pointer",
                            borderRadius: 6,
                            fontFamily: "inherit",
                            fontSize: 12,
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
