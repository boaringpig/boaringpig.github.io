// Modal.jsx - a simple dialog overlay. Closes on backdrop click or Escape.
// (This is separate from the classic app's window.showModal/showConfirmModal
// - those still work fine from React for one-off confirms, see the README -
// but a React form inside a dialog is clearer written as a real component.)
import { useEffect } from "react";
import styles from "./Modal.module.css";

export function Modal({ title, onClose, children }) {
	useEffect(function () {
		function handleKeyDown(e) {
			if (e.key === "Escape") onClose();
		}
		document.addEventListener("keydown", handleKeyDown);
		return function () {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	return (
		<div
			className={styles.backdrop}
			onClick={function (e) {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div className={styles.dialog} role="dialog" aria-modal="true" aria-label={title}>
				<div className={styles.header}>
					<h3 className={styles.title}>{title}</h3>
					<button
						className={styles.closeBtn}
						onClick={onClose}
						aria-label="Close dialog"
					>
						&times;
					</button>
				</div>
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	);
}
