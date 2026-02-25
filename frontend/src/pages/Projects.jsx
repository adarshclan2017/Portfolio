import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import "../styles/Projects.css";

function parseTechList(tech) {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech.map(String).map((t) => t.trim()).filter(Boolean);

  return String(tech)
    .split(/[,\|]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function SkeletonCard() {
  return (
    <div className="pCard">
      <div className="pImgWrap">
        <div className="pImg skeleton" />
      </div>

      <div className="pBody">
        <div className="pLine skeleton" />
        <div className="pLine sm skeleton" />
        <div className="pLine sm skeleton" />

        <div className="pPills">
          <span className="pPill skeleton" />
          <span className="pPill skeleton" />
          <span className="pPill skeleton" />
        </div>

        <div className="pActions">
          <span className="pBtn skeleton" />
          <span className="pBtn skeleton" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI states
  const [q, setQ] = useState("");
  const [techFilter, setTechFilter] = useState("All");
  const [sort, setSort] = useState("new"); // new | az

  useEffect(() => {
    let alive = true;

    api
      .get("/projects")
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        if (alive) setProjects(arr);
      })
      .catch(() => {
        if (alive) setProjects([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const allTech = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => parseTechList(p.tech).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = [...projects];

    // filter by tech
    if (techFilter !== "All") {
      list = list.filter((p) => parseTechList(p.tech).includes(techFilter));
    }

    // search
    if (query) {
      list = list.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const tech = parseTechList(p.tech).join(" ").toLowerCase();
        return title.includes(query) || desc.includes(query) || tech.includes(query);
      });
    }

    // sort
    if (sort === "az") {
      list.sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
    } else {
      // newest first if createdAt exists, else keep order
      list.sort((a, b) => {
        const da = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
      });
    }

    return list;
  }, [projects, q, techFilter, sort]);

  return (
    <section className="projectsWrap">
      <div className="projectsContainer">
        <div className="projectsHead">
          <div>
            <h2 className="projectsTitle">Projects</h2>
            <p className="projectsSub">
              A few things I’ve built using React, Node, Express and MongoDB.
            </p>
          </div>

          {/* Controls */}
          <div className="pControls">
            <div className="pSearch">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
              />
              {q ? (
                <button className="pClear" type="button" onClick={() => setQ("")} aria-label="Clear search">
                  ✕
                </button>
              ) : null}
            </div>

            <select
              className="pSelect"
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              aria-label="Filter by tech"
            >
              {allTech.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              className="pSelect"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort projects"
            >
              <option value="new">Newest</option>
              <option value="az">A – Z</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="pMeta">
            <span>
              Showing <b>{filtered.length}</b> of <b>{projects.length}</b>
            </span>
            {(q || techFilter !== "All") && (
              <button
                className="pReset"
                type="button"
                onClick={() => {
                  setQ("");
                  setTechFilter("All");
                  setSort("new");
                }}
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="pGrid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length ? (
          <div className="pGrid">
            {filtered.map((p) => {
              const techList = parseTechList(p.tech).slice(0, 6);
              const github = p.github || p.githubUrl || "";
              const demo = p.demo || p.live || p.link || "";

              return (
                <article key={p._id || `${p.title}-${Math.random()}`} className="pCard">
                  {/* Image */}
                  <div className="pImgWrap">
                    {p.image ? (
                      <img className="pImgReal" src={p.image} alt={p.title || "Project"} loading="lazy" />
                    ) : (
                      <div className="pImgFallback">
                        <i className="fa-regular fa-image" aria-hidden="true" />
                        <span>No image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pBody">
                    <h3 className="pTitle">{p.title || "Untitled Project"}</h3>
                    <p className="pDesc">{p.description || "No description provided yet."}</p>

                    {/* Tech pills */}
                    <div className="pPills">
                      {techList.length ? (
                        techList.map((t, i) => (
                          <span key={`${t}-${i}`} className="pPill">
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="pPill muted">No tech</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pActions">
                      {demo ? (
                        <a className="pBtn primary" href={demo} target="_blank" rel="noreferrer">
                          Live Demo <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <button className="pBtn disabled" type="button" disabled>
                          No Demo
                        </button>
                      )}

                      {github ? (
                        <a className="pBtn" href={github} target="_blank" rel="noreferrer">
                          GitHub <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <button className="pBtn disabled" type="button" disabled>
                          No GitHub
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="pEmpty">
            <div className="pEmptyIcon">
              <i className="fa-solid fa-folder-open" aria-hidden="true" />
            </div>
            <h3>No projects found</h3>
            <p>
              {projects.length
                ? "Try changing the search or filters."
                : "Add projects from your Admin Dashboard, then they will show here."}
            </p>

            {projects.length ? (
              <button
                className="pReset big"
                type="button"
                onClick={() => {
                  setQ("");
                  setTechFilter("All");
                  setSort("new");
                }}
              >
                Clear filters
              </button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}