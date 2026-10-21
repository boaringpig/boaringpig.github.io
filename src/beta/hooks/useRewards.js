// useRewards.js - rewards, purchase history, and the (single-row-per-group)
// reward system settings, plus all the mutation wrappers.
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

var DEFAULT_SETTINGS = {
	instantPurchaseLimit: 500,
	currentInstantSpend: 0,
	resetDurationDays: 30,
	lastResetAt: null,
	requiresAuthorizationAfterLimit: true,
};

function byTitle(a, b) {
	return a.title.localeCompare(b.title);
}

function byPurchaseDateDesc(a, b) {
	return new Date(b.purchaseDate) - new Date(a.purchaseDate);
}

export function useRewards() {
	var app = useApp();
	var masterUsername = app.activeMasterContext;

	var rewardsList = useRealtimeList({
		table: "rewards",
		masterUsername: masterUsername,
		sort: byTitle,
	});
	var purchasesList = useRealtimeList({
		table: "userRewardPurchases",
		select: "*, rewards(title, cost, type)",
		masterUsername: masterUsername,
		sort: byPurchaseDateDesc,
	});

	var [settings, setSettings] = useState(DEFAULT_SETTINGS);
	var [settingsStatus, setSettingsStatus] = useState("loading");

	// Random per-instance suffix so a repeated topic name across hook
	// instances never collides -- see useRealtimeList.js for the full
	// explanation of why this is needed.
	var instanceId = useRef(Math.random().toString(36).slice(2)).current;

	var loadSettings = useCallback(
		async function () {
			if (!masterUsername) return;
			setSettingsStatus("loading");
			var result = await window.supabase
				.from("rewardSystemSettings")
				.select("*")
				.eq("master_username", masterUsername)
				.limit(1);
			if (result.error) {
				setSettingsStatus("error");
				return;
			}
			setSettings(
				result.data && result.data.length > 0 ? result.data[0] : DEFAULT_SETTINGS
			);
			setSettingsStatus("ready");
		},
		[masterUsername]
	);

	useEffect(
		function () {
			loadSettings();
			if (!masterUsername) return undefined;
			var channel = window.supabase
				.channel("beta_reward_settings_" + masterUsername + "_" + instanceId)
				.on(
					"postgres_changes",
					{
						event: "*",
						schema: "public",
						table: "rewardSystemSettings",
						filter: "master_username=eq." + masterUsername,
					},
					function () {
						loadSettings();
					}
				)
				.subscribe();
			return function () {
				window.supabase.removeChannel(channel);
			};
		},
		[masterUsername, loadSettings]
	);

	return {
		rewards: rewardsList.items,
		rewardsStatus: rewardsList.status,
		rewardsError: rewardsList.error,
		reloadRewards: rewardsList.reload,

		purchases: purchasesList.items,
		purchasesStatus: purchasesList.status,
		purchasesError: purchasesList.error,
		reloadPurchases: purchasesList.reload,

		settings: settings,
		settingsStatus: settingsStatus,

		addReward: function (title, description, cost, type) {
			return window.addReward(title, description, cost, type);
		},
		updateReward: function (id, title, description, cost, type) {
			return window.updateReward(id, title, description, cost, type);
		},
		deleteReward: function (id) {
			return window.deleteReward(id);
		},
		purchaseReward: function (rewardId) {
			return window.purchaseReward(rewardId);
		},
		authorizePurchase: function (id) {
			return window.authorizePurchase(id);
		},
		denyPurchase: function (id) {
			return window.denyPurchase(id);
		},
		resetInstantPurchaseLimit: function () {
			return window.resetInstantPurchaseLimit();
		},
		updateRewardSystemSettings: function (limit, resetDuration, requiresAuth) {
			return window.updateRewardSystemSettings(limit, resetDuration, requiresAuth);
		},
	};
}
