// SuggestionForm.jsx - lets a slave suggest a task (shown only to slaves).
import { useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";

var emptyForm = { description: "", justification: "", points: 10, dueDate: "" };

export function SuggestionForm({ onSubmit }) {
	var [form, setForm] = useState(emptyForm);
	var [submitting, setSubmitting] = useState(false);

	function updateField(key, value) {
		setForm(function (prev) {
			return Object.assign({}, prev, { [key]: value });
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!form.description.trim()) return;
		setSubmitting(true);
		try {
			await onSubmit(form);
			setForm(emptyForm);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Card>
			<h2>Suggest a Task</h2>
			<form onSubmit={handleSubmit}>
				<TextInput
					label="Description"
					value={form.description}
					onChange={function (e) {
						updateField("description", e.target.value);
					}}
					required
				/>
				<TextInput
					label="Why? (optional)"
					multiline
					rows={3}
					value={form.justification}
					onChange={function (e) {
						updateField("justification", e.target.value);
					}}
				/>
				<TextInput
					label="Suggested points"
					type="number"
					min="0"
					value={form.points}
					onChange={function (e) {
						updateField("points", e.target.value);
					}}
				/>
				<TextInput
					label="Suggested due date (optional)"
					type="datetime-local"
					value={form.dueDate}
					onChange={function (e) {
						updateField("dueDate", e.target.value);
					}}
				/>
				<Button type="submit" loading={submitting} disabled={!form.description.trim()}>
					Submit suggestion
				</Button>
			</form>
		</Card>
	);
}
