# Welcome to your Expo App with Supabase, React-Query, and AsyncStorage 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). The project is integrated with Supabase for backend services, React-Query for efficient data fetching and caching, and AsyncStorage for persistent local storage.

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
     npx expo start
    ```

In the output, you'll find options to open the app in a

-   [development build](https://docs.expo.dev/develop/development-builds/introduction/)
-   [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## 🛠️ Supabase Configuration and Table Setup

### Configuration

Supabase Client: Initialized in src/lib/supabase.js:

```ts
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://wacpgrwweosevcpplxlw.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhY3Bncnd3ZW9zZXZjcHBseGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMDgwNjksImV4cCI6MjA2MjU4NDA2OX0.CxzjAMDi25o0qUszDsXfBLGNJPzIlQiXyHWRRK0s_hE',

	{
		auth: {
			storage: AsyncStorage,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	}
);
```

## ⚡ Using React-Query

React Query is used for efficient server state management and caching.

### Fetching Tasks

```ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useTasks = () => {
	return useQuery(
		['tasks'],
		async () => {
			const { data, error } =
				await supabase
					.from('tasks')
					.select('*');
			if (error) throw error;
			return data;
		}
	);
};
```

-   Queries are automatically cached.
-   Background refetching keeps data fresh.
-   React-Query Devtools can be used for debugging.

## 💾 AsyncStorage Integration

AsyncStorage is used to persist specific pieces of data locally on the device.

### Caching Auth Tokens

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (
	token: string
) => {
	try {
		await AsyncStorage.setItem(
			'user_token',
			token
		);
	} catch (e) {
		console.error(
			'Failed to save token:',
			e
		);
	}
};

export const getToken = async () => {
	try {
		return await AsyncStorage.getItem(
			'user_token'
		);
	} catch (e) {
		console.error(
			'Failed to load token:',
			e
		);
	}
};
```

-   Storing auth/session tokens
-   Preserving offline preferences
-   Bootstrapping app state

# 🔄 Reset the Project

```bash
npm run reset-project
```

## Learn more

To learn more about developing your project with Expo, look at the following resources:

-   [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
-   [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

-   [Supabase Docs](https://supabase.com/docs)
-   [React Query Docs](https://tanstack.com/query/latest)
-   [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)

## Join the community

Join our community of developers creating universal apps.

-   [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
-   [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
