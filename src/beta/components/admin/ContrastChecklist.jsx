// ContrastChecklist.jsx - the live WCAG contrast readout shown while an
// admin is picking a group's theme colors. Uses the SAME js/contrast.js
// utility the classic admin modal uses (window.ContrastUtils) so there's
// only one implementation of the contrast math in the whole app.
import { Badge } from "../common/Badge";
import styles from "./ContrastChecklist.module.css";

export function ContrastChecklist({ theme }) {
	if (!window.ContrastUtils) return null;
	var results = window.ContrastUtils.checkThemeContrast(theme);

	return (
		<ul className={styles.list}>
			{results.map(function (r) {
				return (
					<li key={r.label} className={styles.row}>
						<span>{r.label}</span>
						<span className={styles.ratio}>
							{r.ratio ? r.ratio.toFixed(1) + ":1" : "n/a"} (needs {r.required}:1)
						</span>
						<Badge tone={r.passes ? "success" : "danger"}>
							{r.passes ? "Pass" : "Fail"}
						</Badge>
					</li>
				);
			})}
		</ul>
	);
}
