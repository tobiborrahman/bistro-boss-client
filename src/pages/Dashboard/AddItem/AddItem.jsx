import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_image_upload_token;

const AddItem = () => {
	const { register, handleSubmit, reset } = useForm();

	const [axiosSecure] = useAxiosSecure();

	const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

	const onSubmit = (data) => {
		console.log(data);
		const formData = new FormData();
		formData.append('image', data.image[0]);

		fetch(img_hosting_url, {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((imgResponse) => {
				// console.log(imgResponse);
				if (imgResponse.success) {
					const imgURL = imgResponse.data.display_url;
					const { name, price, recipe, category } = data;
					const newItem = {
						name,
						price: parseFloat(price),
						recipe,
						category,
						image: imgURL,
					};
					// console.log(newItem);

					axiosSecure.post('/menu', newItem).then((data) => {
						console.log(data.data);
						if (data.data.insertedId) {
							reset();
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: 'Item added successfully',
								showConfirmButton: false,
								timer: 1500,
							});
						}
					});
				}
			});
	};

	return (
		<div className="w-full">
			<SectionTitle
				subHeading="What's New"
				heading="add an item"
			></SectionTitle>
			<div className="w-[600px] mx-auto bg-gray-100 my-10 p-5">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label>
							<span>Recipe Name*</span>
						</label>
						<br />
						<input
							type="text"
							className="rounded-sm p-3 w-full"
							placeholder="recipe name"
							{...register('name', {
								required: true,
								maxLength: 80,
							})}
						/>
					</div>
					<div className="flex">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Category*</span>
							</label>
							<select
								{...register('category', { required: true })}
								className="rounded-sm p-3 w-full"
							>
								<option selected disabled>
									Pick a Category
								</option>
								<option>Pizza</option>
								<option>Salad</option>
								<option>Dessert</option>
								<option>Deshi</option>
								<option>Soup</option>
								<option>Drinks</option>
							</select>
						</div>

						<div className="mt-3 ml-5 w-full">
							<label>
								<span>Price*</span>
							</label>
							<input
								type="number"
								className="rounded-sm p-3 w-full"
								placeholder="price"
								{...register('price', {
									required: true,
									maxLength: 80,
								})}
							/>
						</div>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text">Recipe Details</span>
						</label>
						<textarea
							{...register('recipe', { required: true })}
							className="rounded-sm pl-4 pt-4 w-full h-32"
							placeholder="Recipe Details"
						></textarea>
					</div>

					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Pick a file</span>
						</label>
						<input
							{...register('image', { required: true })}
							type="file"
							className="file-input file-input-bordered w-full max-w-xs"
						/>
					</div>

					<input
						className="rounded-sm bg-orange-300 py-2 px-4 my-5"
						type="submit"
						value="Add Item"
					/>
				</form>
			</div>
		</div>
	);
};

export default AddItem;
