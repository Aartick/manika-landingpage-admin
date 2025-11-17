import mongoose, { Schema } from "mongoose";

const ProblemSchema = new Schema({
  text: { type: String, default: "" },
});

const CardSchema = new Schema({
  title: String,
  description: String,
});

const PromiseSchema = new Schema({
  emoji: String,
  title: String,
  desc: String,
});

const OfferDetailSchema = new Schema({
  icon: String, // icon stored as string ID
  title: String,
  desc: String,
});

const OfferSchema = new Schema({
  title: String,
  subtitle: String,
  description: String,
  details: {
    type: [OfferDetailSchema],
    default: [],
  },
  ctaLabel: String,
  ctaLink: String,
});

const ExperienceItemSchema = new Schema({
  icon: String,
  title: String,
  desc: String,
});

const ExperienceSchema = new Schema({
  title: String,
  description: String,
  items: {
    type: [ExperienceItemSchema],
    default: [],
  },
});

const WhyItemSchema = new Schema({
  title: String,
  desc: String,
});

const WhySectionSchema = new Schema({
  title: String,
  items: {
    type: [WhyItemSchema],
    default: [],
  },
});

const WhoSectionSchema = new Schema({
  title: { type: String, default: "" },
  forYou: { type: [String], default: [] },
  notForYou: { type: [String], default: [] },
});

const IncludedItemSchema = new Schema({
  icon: String,     // stored as string id (e.g., "bullseye")
  title: String,
  desc: String,
});

const IncludedSectionSchema = new Schema({
  title: String,
  items: {
    type: [IncludedItemSchema],
    default: [],
  },
  bonusTitle: String,
  bonusDesc: String,
});



const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    imageUrl: { type: String, required: true },

    // Buttons
    buttons: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    cards: { type: [CardSchema], default: [] },

    problems: { type: [ProblemSchema], default: [] },

    promises: { type: [PromiseSchema], default: [] },

    // 🔥 REQUIRED FIELD THAT WAS MISSING
    enrollLink: { type: String, default: "#" },

    // Offer
    offer: { type: OfferSchema, default: {} },

    // Experience
    experience: { type: ExperienceSchema, default: {} },

   whySection: { type: WhySectionSchema, default: {} },

   whoSection: { type: WhoSectionSchema, default: {} },

   includedSection: { type: IncludedSectionSchema, default: {} },

   stickyCTA: {
  text: { type: String, default: "" },
  buttonLabel: { type: String, default: "" },
  buttonLink: { type: String, default: "" },
},


    slug: { type: String, unique: true, required: true },
    visible: { type: Boolean, default: true },
  },

  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
