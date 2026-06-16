import { useMemo, useState } from "react";

const stats = [
  { label: "Students tracked", value: "2,480+" },
  { label: "Avg attendance", value: "91.8%" },
  { label: "High-risk alerts", value: "42" }
];

const riskRows = [
  {
    name: "Riya Sharma",
    grade: "10-A",
    attendance: "68%",
    risk: "High",
    reason: "Repeated absences over 3 weeks"
  },
  {
    name: "Aarav Mehta",
    grade: "9-C",
    attendance: "74%",
    risk: "High",
    reason: "Attendance drop after midterm"
  },
  {
    name: "Sara Khan",
    grade: "11-B",
    attendance: "81%",
    risk: "Medium",
    reason: "Irregular attendance and low engagement"
  },
  {
    name: "Kabir Jain",
    grade: "8-D",
    attendance: "85%",
    risk: "Medium",
    reason: "Trendline declining for 2 months"
  }
];

const attendanceByGrade = [
  ["Grade 8", 94],
  ["Grade 9", 90],
  ["Grade 10", 87],
  ["Grade 11", 92]
];

const interventions = [
  "Call guardians for high-risk students below 75% attendance.",
  "Assign counselor follow-up for students with two consecutive warning flags.",
  "Review teacher notes before generating the next intervention list."
];

function Header({ activeView, onNavigate }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">StudTrack AI</p>
        <h1>Student Attendance and Dropout Risk System</h1>
      </div>
      <nav className="nav">
        <button
          className={activeView === "home" ? "nav-link active" : "nav-link"}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>
        <button
          className={activeView === "teacher" ? "nav-link active" : "nav-link"}
          onClick={() => onNavigate("teacher")}
        >
          Teacher Login
        </button>
        <button
          className={activeView === "admin-login" || activeView === "admin-dashboard" ? "nav-link active" : "nav-link"}
          onClick={() => onNavigate("admin-login")}
        >
          Admin Login
        </button>
      </nav>
    </header>
  );
}

function Home({ onNavigate }) {
  return (
    <section className="hero-grid">
      <div className="hero-copy panel large-panel">
        <span className="pill">Early support, not late reaction</span>
        <h2>Track attendance daily and predict which students may be at risk of dropping out.</h2>
        <p>
          This React frontend gives you a polished school dashboard with separate teacher and
          admin login experiences. You can connect it later to your attendance database and prediction model.
        </p>
        <div className="action-row">
          <button className="primary-button" onClick={() => onNavigate("teacher")}>
            Open Teacher Login
          </button>
          <button className="secondary-button" onClick={() => onNavigate("admin-login")}>
            Open Admin Login
          </button>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel overview-panel">
        <h3>What this starter UI includes</h3>
        <div className="feature-list">
          <article>
            <h4>Teacher workflow</h4>
            <p>Secure login form, quick classroom access, and a clear path to attendance marking.</p>
          </article>
          <article>
            <h4>Admin access control</h4>
            <p>Separate admin login before opening the school-wide risk and attendance dashboard.</p>
          </article>
          <article>
            <h4>Prediction-ready layout</h4>
            <p>Risk watchlist cards and tables designed to plug into your dropout model outputs.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function TeacherLogin({ onNavigate }) {
  return (
    <section className="page-grid">
      <div className="panel large-panel">
        <span className="pill blue">Teacher Portal</span>
        <h2>Start the day with attendance, insight, and follow-up in one place.</h2>
        <p>
          Use this login page as the frontend entry point for teachers. Later you can connect it to
          backend authentication and route teachers into a class attendance screen.
        </p>
        <div className="checklist">
          <div className="check-item">Mark attendance by class period</div>
          <div className="check-item">Review students with repeated absences</div>
          <div className="check-item">Send flagged cases to the admin intervention queue</div>
        </div>
      </div>

      <div className="panel form-panel">
        <p className="eyebrow">Secure sign in</p>
        <h3>Teacher Login</h3>
        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Teacher ID or Email
            <input type="text" placeholder="teacher@school.edu" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter password" />
          </label>
          <div className="form-actions">
            <label className="remember-row">
              <input type="checkbox" /> Keep me signed in
            </label>
            <button type="button" className="ghost-link">
              Forgot password?
            </button>
          </div>
          <button className="primary-button" type="submit">
            Sign In as Teacher
          </button>
        </form>
        <div className="callout-box">
          <strong>Suggested next page</strong>
          <p>Build a teacher attendance page with present or absent toggles and recent-risk alerts.</p>
          <button className="secondary-button" onClick={() => onNavigate("admin-login")}>
            Go to Admin Login
          </button>
        </div>
      </div>
    </section>
  );
}

function AdminLogin({ onLogin }) {
  return (
    <section className="page-grid">
      <div className="panel large-panel">
        <span className="pill">Admin Portal</span>
        <h2>Protect school-wide attendance and dropout-risk data behind an admin sign-in.</h2>
        <p>
          This screen is the correct entry point for administrators. After login, the admin dashboard
          opens with risk watchlists, attendance trends, and intervention actions.
        </p>
        <div className="checklist">
          <div className="check-item">Review school-wide attendance performance</div>
          <div className="check-item">See students flagged as medium or high risk</div>
          <div className="check-item">Manage intervention and counselor follow-up actions</div>
        </div>
      </div>

      <div className="panel form-panel">
        <p className="eyebrow">Restricted access</p>
        <h3>Admin Login</h3>
        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin();
          }}
        >
          <label>
            Admin Email
            <input type="email" placeholder="admin@school.edu" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter admin password" />
          </label>
          <label>
            Access Code
            <input type="text" placeholder="School admin access code" />
          </label>
          <div className="form-actions">
            <label className="remember-row">
              <input type="checkbox" /> Trusted device
            </label>
            <button type="button" className="ghost-link">
              Need help?
            </button>
          </div>
          <button className="primary-button" type="submit">
            Sign In as Admin
          </button>
        </form>
        <div className="callout-box">
          <strong>Demo behavior</strong>
          <p>Clicking the admin sign-in button opens the dashboard so you can preview the full flow.</p>
        </div>
      </div>
    </section>
  );
}

function AdminDashboard({ onLogout }) {
  const highRiskCount = useMemo(
    () => riskRows.filter((student) => student.risk === "High").length,
    []
  );

  return (
    <section className="dashboard-layout">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h3>Attendance health and dropout risk overview</h3>
        </div>
        <button className="secondary-button" onClick={onLogout}>
          Log Out Admin
        </button>
      </div>

      <div className="kpi-grid">
        <div className="panel stat-panel">
          <span>Attendance Rate</span>
          <strong>91.8%</strong>
          <p>+1.7% from last month</p>
        </div>
        <div className="panel stat-panel warning">
          <span>High-Risk Students</span>
          <strong>{highRiskCount}</strong>
          <p>Needs immediate review</p>
        </div>
        <div className="panel stat-panel">
          <span>Moderate Risk</span>
          <strong>118</strong>
          <p>Watchlist across all grades</p>
        </div>
        <div className="panel stat-panel accent">
          <span>Interventions Open</span>
          <strong>26</strong>
          <p>Pending counselor follow-up</p>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="panel table-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Priority students</p>
              <h3>Current dropout risk watchlist</h3>
            </div>
            <span className="badge danger">Review daily</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Grade</th>
                  <th>Attendance</th>
                  <th>Risk</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {riskRows.map((student) => (
                  <tr key={student.name}>
                    <td>{student.name}</td>
                    <td>{student.grade}</td>
                    <td>{student.attendance}</td>
                    <td>
                      <span className={student.risk === "High" ? "badge danger" : "badge warning"}>
                        {student.risk}
                      </span>
                    </td>
                    <td>{student.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="side-column">
          <div className="panel">
            <p className="eyebrow">Intervention queue</p>
            <h3>Suggested admin actions</h3>
            <div className="stack-list">
              {interventions.map((item) => (
                <div className="stack-card" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <p className="eyebrow">Attendance snapshot</p>
            <h3>Grade-level trend</h3>
            <div className="progress-list">
              {attendanceByGrade.map(([grade, percent]) => (
                <div key={grade}>
                  <div className="progress-header">
                    <span>{grade}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState("home");

  return (
    <div className="app-shell">
      <Header activeView={activeView} onNavigate={setActiveView} />
      {activeView === "home" && <Home onNavigate={setActiveView} />}
      {activeView === "teacher" && <TeacherLogin onNavigate={setActiveView} />}
      {activeView === "admin-login" && <AdminLogin onLogin={() => setActiveView("admin-dashboard")} />}
      {activeView === "admin-dashboard" && <AdminDashboard onLogout={() => setActiveView("admin-login")} />}
    </div>
  );
}
