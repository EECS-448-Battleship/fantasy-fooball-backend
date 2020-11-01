Flitter-Flap is an experimental code migration tool. It's goal is to write migrations for your codebase itself. That way, when core libraries like Flitter are updated, breaking changes can be accounted for in the migrations.

It's still a work in progress, so use it with caution. Try `node flitter flap` to get started. Migrations are provided by library packages. Each library package gets its own `.json` file in this directory to keep track of the migrations that have been applied.

Unless you really know what you're doing, you shouldn't modify these files. Otherwise, Flap might try to migrate something twice, or skip a migration.

https://flitter.garrettmills.dev/tutorial-getting-started-6.html
