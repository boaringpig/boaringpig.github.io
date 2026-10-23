// SiteSettingsForm.jsx - site-wide branding strings (browser tab title,
// login screen heading). These show before any user is logged in -- there's
// no group context yet to key off of -- so they're a single shared row,
// admin-only to edit (js/core/site-settings.js's window.siteSettings). The
// app header subtitle is a separate, per-group setting -- see
// MasterEditForm.jsx's "App header subtitle" field.
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./SiteSettingsForm.module.css";

export function SiteSettingsForm() {
	var app = useApp();
	var [pageTitle, setPageTitle] = useState(app.siteSettings.pageTitle);
	var [loginHeading, setLoginHeading] = useState(app.siteSettings.loginHeading);
	var [saving, setSaving] = useState(false);

	useEffect(
		function () {
			setPageTitle(app.siteSettings.pageTitle);
			setLoginHeading(app.siteSettings.loginHeading);
		},
		[app.siteSettings]
	);

	async function handleSave(e) {
		e.preventDefault();
		setSaving(true);
		try {
			await window.updateSiteSettings({
				pageTitle: pageTitle,
				loginHeading: loginHeading,
			});
			app.refresh();
		} finally {
			setSaving(false);
		}
	}

	return (
		<Card>
			<h3 className={styles.heading}>Site Settings</h3>
			<p className={styles.hint}>
				These are shared site-wide, across every group - they show before
				anyone has logged in, so there's no group to scope them to.
			</p>
			<form onSubmit={handleSave}>
				<div className={styles.row}>
					<TextInput
						label="Browser tab title"
						value={pageTitle}
						onChange={function (e) {
							setPageTitle(e.target.value);
						}}
						maxLength={60}
					/>
					<TextInput
						label="Login screen heading"
						value={loginHeading}
						onChange={function (e) {
							setLoginHeading(e.target.value);
						}}
						maxLength={60}
					/>
				</div>
				<div className={styles.actions}>
					<Button type="submit" loading={saving}>
						Save
					</Button>
				</div>
			</form>
		</Card>
	);
}
