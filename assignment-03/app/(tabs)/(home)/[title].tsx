import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function DetailsScreen() {
	const router = useRouter();
	const { title } = useLocalSearchParams<{ title?: string }>();

	function handleGoBack() {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push('/');
		}
	}

	return (
		<Box className="flex-1 p-4">
			<Heading size="xl" className="self-center mb-6">
				{title ? `Dynamic Page: ${title}` : 'No Title Provided'}
			</Heading>
			<Button title="Go Back" onPress={handleGoBack} />
		</Box>
	);
}
