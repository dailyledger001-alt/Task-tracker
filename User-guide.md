# Task Tracker — User Guide

## 1. Introduction

Task Tracker is a local-first productivity workspace for one-time tasks, recurring routines, habits, and daily reflection. It brings all task-related pages together while keeping the data on the current device.

## 2. Getting Started

1. Open `index.html` in a modern browser.
2. Open **Preferences** from the top-right data menu.
3. Enter your name and choose whether the week starts on Monday or Sunday.
4. Add your first task from **Task Tracker → Variable Tasks**.
5. Add repeating work from **Recurring Rules**.
6. Add habits and begin recording daily journal entries.

## 3. Navigation

The sidebar contains:

- **Dashboard** — task and habit summary.
- **Task Tracker**
  - **Variable Tasks** — one-time tasks and the task board.
  - **Recurring Rules** — schedules that automatically generate tasks.
  - **Recurring Tasks** — today, tomorrow, and recurring history.
  - **Habit Tracker** — daily or weekly habit tracking.
  - **Daily Journal** — mood, sleep, water, and notes.

On a small screen, use the menu button to open or close the sidebar.

## 4. Dashboard

The Dashboard gives a quick view of:

- open tasks;
- tasks due today;
- recurring tasks due today;
- habits completed today;
- variable tasks that need attention;
- today’s recurring checklist;
- habit rhythm and streaks;
- today’s journal status.

Use the Dashboard for a quick check-in, then open the relevant Task Tracker page for full details.

## 5. Variable Tasks

Use Variable Tasks for work that does not follow a repeating schedule.

### Add a task

Enter:

- task title;
- due date;
- priority: Low, Medium, or High;
- status: To do, In progress, or Done;
- optional notes.

### Task summary

The page shows counts for:

- open tasks;
- due today;
- overdue;
- completed.

**Today’s focus** brings urgent and relevant tasks together.

### Task board

Tasks are organized into:

- **To do**;
- **In progress**;
- **Done**.

Use the available actions to start a task, mark it done, edit its details, or remove it. Overdue tasks are highlighted so they are easy to identify.

## 6. Recurring Rules

Recurring Rules create future task instances automatically.

### Create a rule

Enter:

- task name;
- frequency: Daily, Weekly, or Monthly;
- interval, such as every 1 week or every 2 months;
- start date;
- optional end date.

Review the occurrence preview before saving.

### Manage a rule

- Editing a rule rebuilds its future occurrences while preserving completed history.
- Removing a rule removes its future generated instances but keeps completed records.

Use rules for genuinely repeating work instead of manually creating the same task many times.

## 7. Recurring Tasks

This page turns active rules into a practical daily checklist.

### Today

Complete or undo tasks due today. Completed items are saved to recurring history.

### Tomorrow

Tomorrow’s list is a read-only preview, so future work can be reviewed without accidentally completing it early.

### History

History shows completed and missed recurring items. The page also summarizes tasks due today, due tomorrow, completed, and the number of active rules.

## 8. Habit Tracker

### Add a habit

Enter a habit name, optional category, and frequency:

- **Daily** — due every day.
- **Weekdays** — due Monday through Friday.
- **Weekly** — tracked once during each habit week.

### Track progress

Only today’s due habits can be checked. Past incomplete dates are shown as missed, and future dates remain locked.

Use the week controls to review earlier or later weeks. Each habit shows its current streak and best streak. Habits can be edited or removed, with an immediate **Undo** option after removal.

The summary displays active habits, completed today, completed this week, and the best streak.

## 9. Daily Journal

Create one journal entry per date. Saving the same date again updates the existing entry.

### Journal fields

- **Mood** — required, from 1 to 5: Rough, Low, Okay, Good, or Great.
- **Sleep** — optional, from 0 to 24 hours.
- **Water** — optional, from 0 to 30 glasses.
- **Note** — optional daily reflection.

The journal shows:

- logging streak;
- average mood over the last seven days;
- average sleep over the last seven days;
- average water intake over the last seven days;
- a seven-day view;
- up to 30 recent entries.

Entries can be edited or removed. Use **Undo** immediately after accidental removal.

## 10. Preferences, Backup, and Restore

Open the top-right data menu.

### Preferences

Set your display name and choose the first day of the week. This choice affects weekly views in the tracker.

### Export backup

Select **Export backup** to download a JSON file containing task, recurring, habit, journal, and preference data. Export regularly and store the file safely.

### Import backup

1. Select **Import backup**.
2. Choose a backup created by Task Tracker.
3. Confirm the import.
4. Review the Dashboard and task pages.

Import replaces the current Task Tracker data in the browser. Export the current data first if it may still be needed.

## 11. Recommended Daily Workflow

1. Open the Dashboard for today’s summary.
2. Review **Today’s focus** in Variable Tasks.
3. Start or complete priority tasks.
4. Complete today’s recurring checklist.
5. Check off habits only when completed.
6. Add a Daily Journal entry before finishing the day.
7. Review overdue or missed work and reschedule where appropriate.

## 12. Troubleshooting

- **A task appears overdue:** verify its due date and status.
- **A recurring task is missing:** confirm that its rule is active and the date falls between its start and optional end date.
- **A future recurring item cannot be checked:** future items are intentionally read-only.
- **A habit cannot be checked:** confirm that the habit is due today; past and future cells are locked.
- **A weekly view starts on the wrong day:** update the week-start setting in Preferences.
- **Data is missing in another browser/device:** export a backup on the original device and import it into the new browser.
- **Data disappeared after browser cleanup:** restore the latest exported backup.

## 13. Privacy Note

All tracker data is stored locally in the browser. Anyone with access to the same browser profile may be able to view it, so protect the device and exported backup files.
