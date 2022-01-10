export default {
    name: "recipe",
    title: "Recipe",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Recipe Name",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 100,
            }
        },
        {
            name: "chef",
            title: "Chef",
            type: "reference",
            to: {type: "chef"},
        },
        {
            name: "maniImage",
            title: "Recipe Main Image",
            type: "image",
            options: {
                hotspot: true,
            }
        },
        {
            name: "ingredient",
            title: "Ingredient",
            type: "array",
            of: [
                {
                   type: "object",
                   fields: [
                       {
                           name: "ingredient",
                           title: "ingredient",
                           type: "reference",
                           to: [{ type: "ingredient"}]
                       },
                       {
                           name: "amount",
                           title: "Amount",
                           type: "number",
                       },
                       {
                           name: "unit",
                           title: "Unit",
                           type: "string",
                           options: {
                               list: ["grams", "tsp", "tbsp", "ml"]
                           }
                       }
                   ],
                    preview: {
                        select: {
                        title: "ingredient.name",
                        name: "ingredient.name",
                        media: "ingredient.image",
                        amount: "amount",
                        unit: "unit",
                        },
                        prepare({
                            title,
                            subtitle,
                            media,
                            amount,
                            unit = "(No unit set)",
                        }) {
                            return {
                                title,
                                subtitle: `${amount} ${unit}`,
                                media,
                            }
                        }
                    },
                  
                }
            ]
        }

    ]
}