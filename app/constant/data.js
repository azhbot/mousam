import { images } from "./images";

export const cardList = [

   {
        id:1,
        name:"productName1",
        cost:40,
        image:images.frock,
        mfgCategory:"indoor",
        categoryId:1,
        subCategoryId:1,
        companyId:1,
        companyName:"companyName1",
        companyLogo:images.company1,
        isCompanyVerified:false
    },
    {
        id:2,
        name:"productName2",
        cost:40,
        image:images.pant,
        mfgCategory:"indoor",
        categoryId:2,
        subCategoryId:2,
        companyId:2,
        companyName:"companyName2",
        companyLogo:images.company2,
        isCompanyVerified:false
    },
    {
        id:3,
        name:"productName3",
        cost:40,
        image:images.kurti,
        mfgCategory:"indoor",
        categoryId:3,
        subCategoryId:3,
        companyId:3,
        companyName:"companyName3",
        companyLogo:images.company3,
        isCompanyVerified:true
    },
    
//     {
//   id: 4,
//   name: "productName4",
//   cost: 55,
//   image: images.shirt,
//   mfgCategory: "outdoor",
//   categoryId: 1,
//   subCategoryId: 4,
//   companyId: 1,
//   companyName: "companyName4",
//   companyLogo: images.company1,
//   isCompanyVerified: true
// },
// {
//   id: 5,
//   name: "productName5",
//   cost: 60,
//   image: images.jeans,
//   mfgCategory: "indoor",
//   categoryId: 2,
//   subCategoryId: 5,
//   companyId: 1,
//   companyName: "companyName5",
//   companyLogo: images.company1,
//   isCompanyVerified: false
// },
// {
//   id: 6,
//   name: "productName6",
//   cost: 70,
//   image: images.shoes,
//   mfgCategory: "outdoor",
//   categoryId: 3,
//   subCategoryId: 6,
//   companyId: 1,
//   companyName: "companyName6",
//   companyLogo: images.company1,
//   isCompanyVerified: true
// },
// {
//   id: 7,
//   name: "productName7",
//   cost: 35,
//   image: images.sweater,
//   mfgCategory: "indoor",
//   categoryId: 4,
//   subCategoryId: 7,
//   companyId: 1,
//   companyName: "companyName7",
//   companyLogo: images.company1,
//   isCompanyVerified: false
// },
// {
//   id: 8,
//   name: "productName8",
//   cost: 45,
//   image: images.jacket,
//   mfgCategory: "outdoor",
//   categoryId: 5,
//   subCategoryId: 8,
//   companyId: 1,
//   companyName: "companyName8",
//   companyLogo: images.company1,
//   isCompanyVerified: true
// }

  // {
  //   id: 1,
  //   name: "random1",
  //   cost: "20",
  //   image: images.kurti,
  //   sizes: ["XL","X","XX"],
  //   varients:[{varient:"red",image:images.noImage},{varient:"blue",image:images.noImage}],
  //   categoryId: 1,
  //   subCategoryId: 11,
  //   gender: "Female",
  //   companyId: 1,
  //   RawMaterials:[],
  //   sortId:1
  // },
  // {
  //   id: 2,
  //   name: "random2",
  //   cost: "30",
  //   image: images.pant,
  //   categoryId: 2,
  //   subCategoryId: null,
  //   gender: "Male",
  //   companyId: 2,
  // },
  // {
  //   id: 3,
  //   name: "random3",
  //   cost: "40",
  //   image: images.frock,
  //   categoryId: 3,
  //   subCategoryId: null,
  //   gender: "Female",
  //   companyId: 3,
  // },
  // {
  //   id: 4,
  //   name: "random4",
  //   cost: "50",
  //   image: images.kidFrock,
  //   categoryId: 4,
  //   subCategoryId: 41,
  //   gender: "Female",
  //   companyId: 4,
  // },
  // {
  //   id: 5,
  //   name: "random5",
  //   cost: "55",
  //   image: images.kidFrock,
  //   categoryId: 1,
  //   subCategoryId: 12,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 6,
  //   name: "random6",
  //   cost: "60",
  //   image: images.kidFrock,
  //   categoryId: 4,
  //   subCategoryId: 42,
  //   gender: "Female",
  //   companyId: 4,
  // },
  // {
  //   id: 7,
  //   name: "random7",
  //   cost: "65/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 4,
  //   subCategoryId: 42,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 8,
  //   name: "random8",
  //   cost: "70/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 4,
  //   subCategoryId: 43,
  //   gender: "Female",
  //   companyId: 4,
  // },
  // {
  //   id: 9,
  //   name: "random9",
  //   cost: "75/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 4,
  //   subCategoryId: 41,
  //   gender: "Female",
  //   companyId: 4,
  // },
  // {
  //   id: 10,
  //   name: "random10",
  //   cost: "80/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 4,
  //   subCategoryId: 42,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 11,
  //   name: "random11",
  //   cost: "85/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 4,
  //   subCategoryId: 41,
  //   gender: "Female",
  //   companyId: 4,
  // },
  // {
  //   id: 12,
  //   name: "random12",
  //   cost: "90/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 5,
  //   subCategoryId: 51,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 13,
  //   name: "random13",
  //   cost: "90/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 5,
  //   subCategoryId: 51,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 14,
  //   name: "random13",
  //   cost: "90/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 5,
  //   subCategoryId: 51,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 15,
  //   name: "random13",
  //   cost: "90/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 5,
  //   subCategoryId: 51,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 16,
  //   name: "random13",
  //   cost: "90/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 5,
  //   subCategoryId: 51,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 17,
  //   name: "random13",
  //   cost: "90/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 5,
  //   subCategoryId: 51,
  //   gender: "Male",
  //   companyId: 4,
  // },
  // {
  //   id: 18,
  //   name: "random13",
  //   cost: "90/Pcs",
  //   image: images.kidFrock,
  //   categoryId: 5,
  //   subCategoryId: 51,
  //   gender: "Male",
  //   companyId: 4,
  // },
];

 export const productDetailsMapById = {
  1: {
    productImages:[images.kurti,images.pant],
    rawMaterials: ["materialOne", "materialTwo", "materialThree"],
    additionalDetails: ["additionalOne", "additionalTwo"],
    rating: 4,
    reviews: [
      { reviewer: "john", review: "Great quality and fast shipping." }
    ],
    reviewPhotos: [images.noImage]
  },
  2: {
    productImages:[images.pant,images.pant],
    rawMaterials: ["steel", "plastic", "rubber"],
    additionalDetails: ["lightweightandlightweight", "durable"],
    rating: 5,
    reviews: [
      { reviewer: "alice", review: "Exactly what I needed!" }
    ],
    reviewPhotos: [images.noImage]
  },
  3: {
    productImages:[images.frock,images.pant],
    rawMaterials: ["wood", "metal", "glass"],
    additionalDetails: ["eco-friendly", "handmade"],
    rating: 3.5,
    reviews: [
      { reviewer: "bob", review: "Good, but packaging could be better." }
    ],
    reviewPhotos: [images.noImage]
  }
};




export const companyList = [
  { id: 1, name: "store1", logo: images.company1 },
  { id: 2, name: "store2", logo: images.company2 },
  { id: 3, name: "store3", logo: images.company3 },
  { id: 4, name: "store4", logo: images.company1 },
  { id: 5, name: "store5", logo: images.company1 },
  { id: 6, name: "store6", logo: images.company1 },
];

export const categoryList = [
  {
    id: 1,
    category: "kurti",
    subCategories: [
      { subCategory: "Casual", id: 11, image: images.pant },
      { subCategory: "Shirt", id: 12, image: images.kurti },
      { subCategory: "Printed", id: 13, image: images.kurti },
    ],
  },
  { id: 2, category: "Pant",subCategories: [
    { subCategory: "Casual", id: 11, image: images.pant },
    { subCategory: "Shirt", id: 12, image: images.kurti },
    { subCategory: "Printed", id: 13, image: images.kurti },
  ], },
  { id: 3, category: "Frock",subCategories: [
    { subCategory: "Casual", id: 11, image: images.pant },
    { subCategory: "Shirt", id: 12, image: images.kurti },
    { subCategory: "Printed", id: 13, image: images.kurti },
  ], },
  {
    id: 4,
    category: "Kidswear",
    subCategories: [
      { subCategory: "Frock", id: 41, image: images.frock },
      { subCategory: "Set", id: 42, image: images.kidFrock },
      { subCategory: "Shirt", id: 43, image: images.kurti },
      { subCategory: "Jeans", id: 44, image: images.frock },
      { subCategory: "Top", id: 45, image: images.kidFrock },
      { subCategory: "Skirt", id: 46, image: images.kurti },
      { subCategory: "Dress", id: 47, image: images.frock },
      { subCategory: "Kurta", id: 48, image: images.kidFrock },
      { subCategory: "Pants", id: 49, image: images.kurti },
      { subCategory: "T-shirt", id: 50, image: images.frock },
    ]
    
    
  },
  {
    id: 5,
    category: "saree",
    subCategories: [
      { subCategory: "Fulkoli", id: 51, image: images.kidFrock },
      { subCategory: "Banarasi", id: 52, image: images.kurti },
    ],
  },
  {
    id: 7,
    category: "shoes",
    subCategories: [
      { subCategory: "Sports", id: 71, image: images.pant },
      { subCategory: "Formal", id: 72, image: images.frock },
    ],
  },
];



  

export const banners=[
    {title: "Shoes", image: images.shoeBanner,text:" Discover our latest shoes" },

    {title: "Foods", image: images.foodBanner,text:" Discover our latest foods"  },

    {title: "Weman Clothing", image: images.wemanClothingBanner,text:" Discover our latest shoes"  },

    {title: "Shirts", image: images.banner1,text:" Discover our latest shoes"  },

    {title: "Cap", image: images.banner1,text:" Discover our latest shoes"  },

    {title: "Watch", image: images.banner1,text:" Discover our latest shoes"  },
  ];





  const xenderCategories = [
    {
      xenderCategoryId: 1,
      xenderCategory: "ALL",
      categories: [
        {
          categoryId: 101,
          category: "Topwear",
          subCategories: [
            {
              subCategoryId: 201,
              subCategory: "Hoodie",
              varities: [
                { varityId: 301, varity: "Printed Hoodie" },
                { varityId: 302, varity: "Casual Hoodie" },
                { varityId: 303, varity: "Standard Hoodie" },
              ],
            },
          ],
        },
        {
          categoryId: 102,
          category: "Bottomwear",
          subCategories: [
            {
              subCategoryId: 202,
              subCategory: "Jeans",
              varities: [
                { varityId: 304, varity: "Slim Fit Jeans" },
                { varityId: 305, varity: "Relaxed Fit Jeans" },
              ],
            },
          ],
        },
        {
          categoryId: 103,
          category: "Footwear",
          subCategories: [
            {
              subCategoryId: 203,
              subCategory: "Sneakers",
              varities: [
                { varityId: 306, varity: "High-top Sneakers" },
                { varityId: 307, varity: "Low-top Sneakers" },
              ],
            },
          ],
        },
      ],
    },
    {
      xenderCategoryId: 2,
      xenderCategory: "Men",
      categories: [
        {
          categoryId: 104,
          category: "Topwear",
          subCategories: [
            {
              subCategoryId: 204,
              subCategory: "Shirt",
              varities: [
                { varityId: 308, varity: "Formal Shirt" },
                { varityId: 309, varity: "Casual Shirt" },
              ],
            },
          ],
        },
        {
          categoryId: 105,
          category: "Bottomwear",
          subCategories: [
            {
              subCategoryId: 205,
              subCategory: "Trousers",
              varities: [
                { varityId: 310, varity: "Chinos" },
                { varityId: 311, varity: "Formal Pants" },
              ],
            },
          ],
        },
        {
          categoryId: 106,
          category: "Footwear",
          subCategories: [
            {
              subCategoryId: 206,
              subCategory: "Loafers",
              varities: [
                { varityId: 312, varity: "Leather Loafers" },
                { varityId: 313, varity: "Suede Loafers" },
              ],
            },
          ],
        },
      ],
    },
    {
      xenderCategoryId: 3,
      xenderCategory: "Women",
      categories: [
        {
          categoryId: 107,
          category: "Topwear",
          subCategories: [
            {
              subCategoryId: 207,
              subCategory: "Blouse",
              varities: [
                { varityId: 314, varity: "Sleeveless Blouse" },
                { varityId: 315, varity: "Full Sleeve Blouse" },
              ],
            },
          ],
        },
        {
          categoryId: 108,
          category: "Bottomwear",
          subCategories: [
            {
              subCategoryId: 208,
              subCategory: "Leggings",
              varities: [
                { varityId: 316, varity: "Solid Leggings" },
                { varityId: 317, varity: "Printed Leggings" },
              ],
            },
          ],
        },
        {
          categoryId: 109,
          category: "Footwear",
          subCategories: [
            {
              subCategoryId: 209,
              subCategory: "Heels",
              varities: [
                { varityId: 318, varity: "Block Heels" },
                { varityId: 319, varity: "Stiletto Heels" },
              ],
            },
          ],
        },
      ],
    },
  ];
  