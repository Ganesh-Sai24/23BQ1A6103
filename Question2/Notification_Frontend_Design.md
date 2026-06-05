# Campus Notifications Frontend

## Overview

This application is a React-based frontend for displaying campus notifications.

## Features

* View all notifications
* Filter notifications by type (Placement, Result, Event)
* View Top N Priority Notifications
* Mark notifications as viewed
* Pagination support
* Responsive dashboard UI

## Priority Logic

Priority order:

1. Placement
2. Result
3. Event

If two notifications have the same type, the newer notification is given higher priority.

## Technologies Used

* React
* Vite
* JavaScript
* Fetch API
* Local Storage

## Functionalities Implemented

1. Fetch notifications from the Notifications API.
2. Display top priority notifications.
3. Filter notifications by category.
4. Track viewed and unviewed notifications.
5. Paginate notification lists.
6. Provide an interactive dashboard interface.

## Conclusion

The frontend provides an organized and user-friendly interface for viewing, filtering, and prioritizing campus notifications.
