// SuggestionsPage.jsx
import { useApp } from "../../context/AppContext";
import { useSuggestions } from "../../hooks/useSuggestions";
import { SuggestionForm } from "./SuggestionForm";
import { SuggestionItem } from "./SuggestionItem";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";

export function SuggestionsPage() {
	var app = useApp();
	var state = useSuggestions();

	if (state.status === "loading") return <LoadingSpinner label="Loading suggestions..." />;
	if (state.status === "error") {
		return (
			<ErrorState
				message={"Couldn't load suggestions: " + (state.error ? state.error.message : "")}
				onRetry={state.reload}
			/>
		);
	}

	if (app.isSlave) {
		var mine = state.suggestions.filter(function (s) {
			return s.suggestedBy === app.currentUser;
		});
		return (
			<div>
				<SuggestionForm onSubmit={state.submitSuggestion} />
				<h2 style={{ marginTop: "var(--space-5)" }}>My Suggestions</h2>
				{mine.length === 0 ? (
					<EmptyState title="No suggestions submitted yet" />
				) : (
					mine.map(function (s) {
						return <SuggestionItem key={s.id} suggestion={s} forAdmin={false} />;
					})
				)}
			</div>
		);
	}

	var pending = state.suggestions.filter(function (s) {
		return s.status === "pending";
	});
	return (
		<div>
			<h2>Suggested Tasks</h2>
			{pending.length === 0 ? (
				<EmptyState title="No suggestions pending review" />
			) : (
				pending.map(function (s) {
					return (
						<SuggestionItem
							key={s.id}
							suggestion={s}
							forAdmin
							onApprove={state.approveSuggestion}
							onEdit={state.editSuggestion}
							onReject={state.rejectSuggestion}
						/>
					);
				})
			)}
		</div>
	);
}
