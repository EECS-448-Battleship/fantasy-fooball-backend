/*
 * Configuration specifying the default values for database-driven
 * game play settings.
 */
const settings_config = {
    default_settings: [
        {
            // True if the game is in the draft stage.
            key: 'in_draft_stage',
            value: true,
        },
        {
            // The current week in the fantasy season
            key: 'current_week',
            value: 1,
        },
    ],
}

module.exports = exports = settings_config
