import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const img_hosting_token = '1d51a8249a9489d53afa0aac13341579';

const Additem = () => {
    let [axiosSecure] = useAxiosSecure();
    let hosting_Url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {

        let fromdata = new FormData();
        fromdata.append('image', data.image[0])

        fetch(hosting_Url, {
            method: "POST",
            body: fromdata
        })
            .then(res => res.json())
            .then(imgsres => {
                if (imgsres.success) {
                    let imgUrl = imgsres.data.display_url;
                    let { price, recipe, name, category } = data;

                    let newitem = { name, price: parseFloat(price), category, image: imgUrl, recipe, status: 'pending' }
                    console.log(newitem);
                    axiosSecure.post('/menu', newitem)
                        .then(data => {
                            console.log(data.data);
                            if (data.data.insertedId) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Your work has been saved',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
                console.log(imgsres);
            })

    };


    return (
        <div className="w-full px-10">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe Name"
                        {...register("name", { required: true, maxLength: 120 })}
                        className="input input-bordered w-full " defaultValue='Food 1' />
                </div>
                <div className="flex my-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Dessert</option>
                            <option>Desi</option>
                            <option>Drinks</option>
                        </select>
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe Details</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio" defaultValue="Looking for a quick lunch? Need to settle the kids' argument about where to get dinner? Leave it to luck! Click the button and have a fast food restaurant selected for you."></textarea>
                </div>
                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text">Item Image*</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                </div>
                <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default Additem;