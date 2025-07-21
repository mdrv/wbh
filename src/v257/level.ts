/**
 * Levels of feature support and global scoring
 *
 * - UNSUPPORTED = -1
 * - CRITICAL    = 0
 * - IMPORTANT   = 1
 * - OPTIONAL    = 2
 * - UNUSED      = 3
 * - MAXIMUM     = 4
 *
 * @remarks
 * Only use Level.UNSUPPORTED and Level.MAXIMUM for scoring
 */
export const Level = {
	/**  only used for scoring */
	UNSUPPORTED: -1,
	CRITICAL: 0,
	IMPORTANT: 1,
	OPTIONAL: 2,
	UNUSED: 3,
	/** only used for scoring */
	MAXIMUM: 4,
} as const

export const userLevel = {
	CRITICAL: 0,
	IMPORTANT: 1,
	OPTIONAL: 2,
	UNUSED: 3,
} as const
