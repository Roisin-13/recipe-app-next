import { sanityClient, urlFor, usePrieviewSubscription, PortableText } from "../../lib/sanity";

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  mainImage{
      asset->{
        _id,
        url  
      }
  },
  ingredient[]{
      _key,
      amount,
      unit,
      ingredient ->{
        name
      }
  },
  instructions,
}`;

export default function OneRecipe({data}) {
    const {recipe} = data; 
    return (
        <article className="recipe">
            <h1>{recipe.name}</h1>
            <main className="recipeContent">
                <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name} className="heroImage"/>
                <div className="recipeBox">
                    <h3>Ingredients</h3>
                    <ul className="ingredientS">
                    
                        {recipe.ingredient?.map((ingredient) => (
                        <li key={ingredient._key} className="ingredient">
                            {ingredient?.amount}
                            {" "}
                            {ingredient?.unit}
                            <br/>
                            {ingredient?.ingredient?.name}
                        </li>
                        ))}
                    </ul>
                    <h3>Instructions</h3>
                    <PortableText blocks={recipe?.instructions} className="instructions"/>
                </div>
            </main>
        </article>
    );   
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "recipe" && defined(slug.current)]{
           "params": {
               "slug": slug.current
           } 
        }`
    );
    return {
        paths,
        fallback:true
    }
}

export async function getStaticProps({params}) {
    const {slug} = params;
    const recipe = await sanityClient.fetch(recipeQuery, {slug})
    return {props: {data: {recipe}}};
}

