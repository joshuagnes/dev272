import { Box } from '@/components/ui/box';
import { useRecipes } from '@/context/RecipesContext';
import { useNavigation } from 'expo-router';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import {
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from '@/components/ui/slider';
import { ScrollView } from 'react-native';
import { Textarea, TextareaInput } from '@/components/ui/textarea';

// Validation schema for the restaurant form
const RecipeSchema = (existingNames: string[]) =>
	Yup.object().shape({
		name: Yup.string()
			.required('Name is required')
			.test('is-unique', 'Recipe name already exists', (value) => {
				if (!value) return true;
				return !existingNames.includes(value.toLowerCase());
			}),
		description: Yup.string().required('Description is required'),
		ingredients: Yup.string().required('Ingredients are required'),
		instructions: Yup.string().required('Instructions are required'),
		time: Yup.object().shape({
			prep: Yup.number()
				.required('Prep time is required')
				.typeError('Must be a number'),
			cook: Yup.number()
				.required('Cook time is required')
				.typeError('Must be a number'),
		}),
		rating: Yup.number()
			.min(1, 'Rating must be at least 1')
			.max(5, 'Rating must be at most 5')
			.required('Rating is required'),
	});

const AddRecipe = () => {
	const navigation = useNavigation();
	const { addRecipe, recipes } = useRecipes();

	return (
		<Box className="flex-1 p-4 dark:bg-neutral-950 ">
			<ScrollView
				className="flex-1 dark:bg-neutral-950"
				contentContainerStyle={{ paddingBottom: 80 }}
				showsVerticalScrollIndicator={false}
			>
				<Formik
					initialValues={{
						name: '',
						description: '',
						ingredients: '',
						instructions: '',
						time: { prep: '', cook: '' },
						rating: 0,
					}}
					validationSchema={RecipeSchema(
						recipes.map((r) => r.name.toLowerCase())
					)}
					onSubmit={(values, { resetForm, setErrors }) => {
						// Check if the recipe name already exists
						const recipeExists = recipes.some(
							(recipe) =>
								recipe.name.toLowerCase() ===
								values.name.toLowerCase()
						);

						if (recipeExists) {
							// Set an error for the name field if it already exists
							setErrors({ name: 'Recipe name already ' });
							return;
						}

						addRecipe({
							// id: Date.now().toString(), //generate a unique id by timestamp
							name: values.name,
							description: values.description,
							ingredients: values.ingredients
								.split(',')
								.map((i) => i.trim()),
							// Convert CSV string to array
							instructions: values.instructions
								.split('.')
								.map((step) => step.trim())
								.filter(Boolean),
							time: {
								prep: Number(values.time.prep),
								cook: Number(values.time.cook),
							},
							rating: values.rating,
						});
						//reset the form
						resetForm();
						navigation.goBack();
					}}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						errors,
						touched,
					}) => (
						<Box>
							{/* Name Input */}
							<Box className="mb-4">
								<Text
									size="lg"
									className="mb-2 text-stone-900 dark:text-white"
								>
									Title
								</Text>
								<Input
									variant="outline"
									size="md"
									className="bg-white dark:bg-zinc-800 mt-2"
								>
									<InputField
										onChangeText={handleChange('name')}
										onBlur={handleBlur('name')}
										value={values.name}
										placeholder="Enter recipe name"
									/>
								</Input>
								{touched.name && errors.name && (
									<Text
										size="sm"
										className="text-red-500 mt-1"
									>
										{errors.name}
									</Text>
								)}
							</Box>
							{/* Description Input */}
							<Box className="mb-4">
								<Text
									size="lg"
									className="mb-2 text-stone-900 dark:text-white"
								>
									Description
								</Text>
								<Input
									variant="outline"
									size="md"
									className="bg-white dark:bg-zinc-900 mt-2"
								>
									<InputField
										onChangeText={handleChange(
											'description'
										)}
										onBlur={handleBlur('description')}
										value={values.description}
										placeholder="Enter description"
									/>
								</Input>
								{touched.description && errors.description && (
									<Text
										size="sm"
										className="text-red-500 mt-1"
									>
										{errors.description}
									</Text>
								)}
							</Box>
							{/* Ingredients Input */}
							<Box className="mb-4">
								<Text
									size="lg"
									className="mb-2 text-stone-900 dark:text-white"
								>
									Ingredients
								</Text>
								<Textarea
									size="md"
									className="bg-white dark:bg-zinc-900 mt-2"
								>
									<TextareaInput
										onChangeText={handleChange(
											'ingredients'
										)}
										onBlur={handleBlur('ingredients')}
										value={values.ingredients}
										placeholder="Enter recipe ingredients"
									/>
								</Textarea>
								{touched.ingredients && errors.ingredients && (
									<Text
										size="sm"
										className="text-red-500 mt-1"
									>
										{errors.ingredients}
									</Text>
								)}
							</Box>
							{/* Instruction Input */}
							<Box className="mb-4">
								<Text
									size="lg"
									className="mb-2 text-stone-900 dark:text-white"
								>
									Instruction
								</Text>
								<Textarea
									size="md"
									className="bg-white dark:bg-zinc-900 mt-2"
								>
									<TextareaInput
										onChangeText={handleChange(
											'instructions'
										)}
										onBlur={handleBlur('instructions')}
										value={values.instructions}
										placeholder="Enter recipe instructions"
									/>
								</Textarea>
								{touched.instructions &&
									errors.instructions && (
										<Text
											size="sm"
											className="text-red-500 mt-1"
										>
											{errors.instructions}
										</Text>
									)}
							</Box>
							{/* Prep Time Input */}
							<Box className="mb-4">
								<Text
									size="lg"
									className="mb-2 text-stone-900 dark:text-white"
								>
									Prep Time (minutes)
								</Text>
								<Input
									variant="outline"
									size="md"
									className="bg-white dark:bg-zinc-900 mt-2"
								>
									<InputField
										onChangeText={handleChange('time.prep')}
										onBlur={handleBlur('time.prep')}
										value={values.time.prep}
										placeholder="Enter prep time"
										keyboardType="numeric"
									/>
								</Input>
								{touched.time?.prep && errors.time?.prep && (
									<Text
										size="sm"
										className="text-red-500 mt-1"
									>
										{errors.time.prep}
									</Text>
								)}
							</Box>

							{/* Cook Time Input */}
							<Box className="mb-4">
								<Text
									size="lg"
									className="mb-2 text-stone-900 dark:text-white"
								>
									Cook Time (minutes)
								</Text>
								<Input
									variant="outline"
									size="md"
									className="bg-white dark:bg-zinc-900 mt-2"
								>
									<InputField
										onChangeText={handleChange('time.cook')}
										onBlur={handleBlur('time.cook')}
										value={values.time.cook}
										placeholder="Enter cook time"
										keyboardType="numeric"
									/>
								</Input>
								{touched.time?.cook && errors.time?.cook && (
									<Text
										size="sm"
										className="text-red-500 mt-1"
									>
										{errors.time.cook}
									</Text>
								)}
							</Box>
							{/* Rating Input */}
							<Box className="mb-4">
								<HStack
									space="md"
									className="mb-4 items-center"
								>
									<Text
										size="lg"
										className="mb-2 text-stone-900 dark:text-white"
									>
										Rating(1-5):
									</Text>
									<Text
										bold
										size="lg"
										className="text-stone-900 dark:text-white mb-2"
									>
										{values.rating || 0}
									</Text>
								</HStack>
								<Box className="flex mx-4">
									<Slider
										defaultValue={values.rating || 0}
										size="sm"
										minValue={1}
										maxValue={5}
										step={1}
										onChange={(value) => {
											handleChange('rating')(
												value.toString()
											);
										}}
										className="mb-6 mt-2"
										value={values.rating || 0}
										accessibilityLabel="Rating Slider"
										accessibilityHint="Slide to select a rating between 1-5"
										accessibilityRole="adjustable"
										accessibilityState={{
											selected: values.rating > 0,
										}}
										accessibilityValue={{
											min: 1,
											max: 5,
											now: values.rating || 0,
										}}
										accessibilityActions={[
											{
												name: 'increment',
												label: 'Increase rating',
											},
											{
												name: 'decrement',
												label: 'decrease rating',
											},
										]}
									>
										<SliderTrack>
											<SliderFilledTrack />
										</SliderTrack>
										<SliderThumb>
											<Text>{values.rating || 0}</Text>
										</SliderThumb>
									</Slider>
								</Box>
							</Box>
							{/* Submit Button */}
							<Button
								action="positive"
								onPress={() => handleSubmit()}
								className="p-2 rounded"
							>
								<ButtonText className="text-white">
									Add Recipe
								</ButtonText>
							</Button>
						</Box>
					)}
				</Formik>
			</ScrollView>
		</Box>
	);
};

export default AddRecipe;
