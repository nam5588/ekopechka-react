const VISITOR_KEY = "visitorId";

const generateId = (): string => {
	try {
		if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
			return crypto.randomUUID();
		}
	} catch (e) {}
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

/** Persistent anonymous id for this browser, so guest views are counted once per item. */
export const getVisitorId = (): string => {
	try {
		let id = localStorage.getItem(VISITOR_KEY);
		if (!id) {
			id = generateId();
			localStorage.setItem(VISITOR_KEY, id);
		}
		return id;
	} catch (e) {
		return generateId();
	}
};
