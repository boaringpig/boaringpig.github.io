// SiteSettingsForm.jsx - site-wide branding strings (browser tab title,
// login screen heading, app header subtitle). Unlike the rest of this
// group's settings, these show before any user is logged in -- there's no
// group context yet to key off of -- so they're a single shared row any
// Master or Admin can edit (js/core/site-settings.js's window.siteSettings).
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
	var [appSubtitle, setAppSubtitle] = useState(app.siteSettings.appSubtitle);
	var [saving, setSaving] = useState(false);

	useEffect(
		function () {
			setPageTitle(app.siteSettings.pageTitle);
			setLoginHeading(app.siteSettings.loginHeading);
			setAppSubtitle(app.siteSettings.appSubtitle);
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
				appSubtitle: appSubtitle,
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
				These are shared site-wide (not specific to your group) - anyone with
				this page can change what everyone sees here and on the login screen.
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
					<TextInput
						label="App header subtitle"
						value={appSubtitle}
						onChange={function (e) {
							setAppSubtitle(e.target.value);
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
