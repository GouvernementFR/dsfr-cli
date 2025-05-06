const GITMOJIS = new Map([
  [':art:', '🎨'], // Improve structure / format of the code.
  [':zap:', '⚡️'], // Improve performance.
  [':fire:', '🔥'], // Remove code or files.
  [':bug:', '🐛'], // Fix a bug.
  [':ambulance:', '🚑'], // Critical hotfix.
  [':sparkles:', '✨'], // Introduce new features.
  [':memo:', '📝'], // Add or update documentation.
  [':rocket:', '🚀'], // Deploy stuff.
  [':lipstick:', '💄'], // Add or update the UI and style files.
  [':tada:', '🎉'], // Begin a project.
  [':white_check_mark:', '✅'], // Add or update tests.
  [':lock:', '🔒'], // Fix security issues.
  [':bookmark:', '🔖'], // Release / Version tags.
  [':rotating_light:', '🚨'], // Fix compiler / linter warnings.
  [':construction:', '🚧'], // Work in progress.
  [':green_heart:', '💚'], // Fix CI Build.
  [':arrow_down:', '⬇️'], // Downgrade dependencies.
  [':arrow_up:', '⬆️'], // Upgrade dependencies.
  [':pushpin:', '📌'], // Pin dependencies to specific versions.
  [':construction_worker:', '👷'], // Add or update CI build system.
  [':chart_with_upwards_trend:', '📈'], // Add or update analytics or track code.
  [':recycle:', '♻️'], // Refactor code.
  [':heavy_plus_sign:', '➕'], // Add a dependency.
  [':heavy_minus_sign:', '➖'], // Remove a dependency.
  [':wrench:', '🔧'], // Add or update configuration files.
  [':globe_with_meridians:', '🌐'], // Internationalization and localization.
  [':pencil2:', '✏️'], // Fix typos.
  [':rewind:', '⏪'], // Revert changes.
  [':twisted_rightwards_arrows:', '🔀'], // Merge branches.
  [':package:', '📦'], // Update compiled files or packages.
  [':alien:', '👽'], // Update code due to external API changes.
  [':truck:', '🚚'], // Move or rename files.
  [':page_facing_up:', '📄'], // Add or update license.
  [':boom:', '💥'], // Introduce breaking changes.
  [':bento:', '🍱'], // Add or update assets.
  [':wheelchair:', '♿️'], // Improve accessibility.
  [':bulb:', '💡'], // Add or update comments in source code.
  [':speech_balloon:', '💬'], // Add or update text and literals.
  [':loud_sound:', '🔊'], // Add or update logs.
  [':mute:', '🔇'], // Remove logs.
  [':busts_in_silhouette:', '👥'], // Add or update contributor(s).
  [':children_crossing:', '🚸'], // Improve user experience / usability.
  [':building_construction:', '🏗'], // Make architectural changes.
  [':iphone:', '📱'], // Work on responsive design.
  [':clown_face:', '🤡'], // Mock things.
  [':see_no_evil:', '🙈'], // Add or update a .gitignore file.
  [':camera_flash:', '📸'], // Add or update snapshots.
  [':alembic:', '⚗️'], // Experiment new things.
  [':mag:', '🔍'], // Improve SEO.
  [':label:', '🏷️'], // Add or update types (Flow, TypeScript).
  [':seedling:', '🌱'], // Add or update seed files.
  [':triangular_flag_on_post:', '🚩'], // Add, update, or remove feature flags.
  [':goal_net:', '🥅'], // Catch errors.
  [':dizzy:', '💫'], // Add or update animations and transitions.
  [':wastebasket:', '🗑'], // Deprecate code that needs to be cleaned up.
  [':passport_control:', '🛂'], // Work on code related to authorization.
  [':adhesive_bandage:', '🩹'], // Simple fix for a non-critical issue.
  [':monocle_face:', '🧐'], // Data exploration/inspection.
  [':coffin:', '⚰️'], // Remove dead code.
  [':test_tube:', '🧪'], // Add or update tests.
  [':necktie:', '👔'], // Add or update code related to code review changes.
  [':stethoscope:', '🩺'], // Add or update health checks.
  [':bricks:', '🧱'], // Add or update build system. Infrastructure related changes.
  [':technologist:', '🧑‍💻'], // Work on code related to tech stack. Improve developer experience.
  [':thread:', '🧵'], // Work on code related to threading.
  [':safety_vest:', '🦺'], // Add or update code related to validation.
  [':t-shirt:', '👕'], // Add or update UI component.
  [':briefcase:', '💼'], // Add or update business logic.
  [':hammer:', '🔨'], // Add or update development scripts.
  [':toolbox:', '🧰'], // Work on code related to tooling.
  [':yarn:', '🧶'], // Work on code related to yarn.
]);

export const gitmoji = (string) => {
  GITMOJIS.forEach((value, key) => {
    string = string.replace(new RegExp(key, 'g'), value);
  });
  return string;
}

export const isBreakingGitmoji = (string) => {
  return string.indexOf(GITMOJIS.get(':boom:')) > -1 || string.indexOf(':boom:') > -1;
}
