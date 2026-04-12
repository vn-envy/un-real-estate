import { useState, useEffect, useRef } from "react";

/* ─── PHASES ─── */
const PHASES = {
  en: [
    { text: "adding stamp duty + registration...", end: 86  },
    { text: "adding 20-year loan interest...",     end: 150 },
    { text: "adding upfront & hidden fees...",     end: 174 },
    { text: "adding recurring charges...",         end: 190 },
    { text: "adding interiors...",                 end: 197 },
    { text: "adding government fees...",           end: 201 },
  ],
  hi: [
    { text: "\u0938\u094d\u091f\u093e\u0902\u092a \u0921\u094d\u092f\u0942\u091f\u0940 + \u0930\u091c\u093f\u0938\u094d\u091f\u094d\u0930\u0947\u0936\u0928 \u091c\u094b\u0921\u093c \u0930\u0939\u0947 \u0939\u0948\u0902...", end: 86  },
    { text: "20 \u0938\u093e\u0932 \u0915\u093e \u092c\u094d\u092f\u093e\u091c \u091c\u094b\u0921\u093c \u0930\u0939\u0947 \u0939\u0948\u0902...",              end: 150 },
    { text: "\u091b\u093f\u092a\u0947 \u0916\u0930\u094d\u091a\u0947 \u091c\u094b\u0921\u093c \u0930\u0939\u0947 \u0939\u0948\u0902...",                    end: 174 },
    { text: "\u092e\u093e\u0938\u093f\u0915 \u0916\u0930\u094d\u091a\u0947 \u091c\u094b\u0921\u093c \u0930\u0939\u0947 \u0939\u0948\u0902...",               end: 190 },
    { text: "\u0907\u0902\u091f\u0940\u0930\u093f\u092f\u0930 \u091c\u094b\u0921\u093c \u0930\u0939\u0947 \u0939\u0948\u0902...",                       end: 197 },
    { text: "\u0938\u0930\u0915\u093e\u0930\u0940 \u0936\u0941\u0932\u094d\u0915 \u091c\u094b\u0921\u093c \u0930\u0939\u0947 \u0939\u0948\u0902...",                  end: 201 },
  ],
};

/* ─── COPY ─── */
const C = {
  en: {
    font:      "'Plus Jakarta Sans',-apple-system,sans-serif",
    tag:       "the real cost, before you sign",
    ticker:    ["Government-released data only","RBI HPI rates","BIS/FRED benchmarks","State stamp duty schedules","GHMC & municipal registrations","Zero commission incentives","No broker affiliations — ever","Always free, no paywall","Your data never leaves your device","Unlike most tools — we earn nothing from your decision"],
    eyebrow:   "Total Cost Architecture",
    h1a: "Every cost.", h1b: "No fiction.",
    sub:       "Fill what you know. We reveal what nobody tells you \u2014 including how this home fits your actual life.",
    cardEye:   "Rs 80L property \u00b7 Hyderabad",
    listedLbl: "Listed at", realLbl: "Real total cost",
    badge:     "+Rs 1.21 Cr hidden from you",
    cardFoot:  "Stamp duty \u00b7 20yr interest \u00b7 Interiors \u00b7 Society \u00b7 Your life",
    cta: "See the Truth \u2192", navCta: "See the Truth",
    freeNote:  "Free \u00b7 No signup \u00b7 Every rupee",
    sec1Lbl:   "What we calculate",
    sec1H:     ["Four things brokers", "never bundle."],
    sec1Sub:   "Fill what you know. Leave the rest blank. We calculate it all \u2014 using real government rates and your actual life stage.",
    pillars: [
      { title:"Property",  col:"#522de6", desc:"Agreement price, carpet vs super built-up, effective Rs/sqft, brokerage, cash component \u2014 all decoded.", tags:["Carpet area","Brokerage","Rs/sqft","Cash component"] },
      { title:"Financing", col:"#5e5b77", desc:"EMI is just the start. Total interest over 20 years, loan fees, prepayment impact, and tax savings under 80C and 24(b).", tags:["EMI breakdown","Total interest","Tax savings","Prepayment"] },
      { title:"Interiors", col:"#ce2c66", desc:"Modular kitchen, wardrobes, flooring, ACs, false ceiling, painting. The 12\u201315L nobody quotes in the brochure.", tags:["Modular kitchen","Wardrobes","Flooring","Appliances"] },
      { title:"Your Life", col:"#0d9488", desc:"Marriage, children, education, aging parents, EPF, SIP. The part no calculator asks \u2014 but shapes whether this buy makes sense.", tags:["Life events","SIP / NPS / EPF","Emergency fund","Rent vs buy"] },
    ],
    privStrong:"Your data never leaves your device.",
    privBody:  "Everything you enter \u2014 income, life events, investments \u2014 is computed entirely in your browser. Nothing is transmitted to our servers, stored, or shared. We built it this way intentionally. Especially for the personal life data you enter.",
    sec2Lbl:   "Your output",
    sec2H:     ["Every rupee, sorted", "by weight."],
    sec2Sub:   "Your cost pyramid builds in real time \u2014 showing exactly what each layer costs and how heavy it sits in your total picture.",
    pyrNote:   "Your cost pyramid \u2014 every rupee sorted by weight",
    barLabels: ["Property","Financing","Upfront & Hidden","Recurring","Interiors","Government"],
    day1Lbl:"Day-1 Cash", day1Sub:"Down payment + govt + interiors + deposit",
    moLbl:"Monthly Commitment", moSub:"EMI + maintenance + recurring",
    sec3Lbl:   "Deep insights",
    sec3H:     ["Numbers are easy.", "Context is rare."],
    sec3Sub:   "We don\u2019t stop at the total. We tell you what the number means \u2014 and what to do before you sign.",
    insights: [
      { col:"#522de6", head:"Joint ownership saves Rs 19.2 L over 20 years", body:"Both co-owners claim Section 24(b) + 80C separately. At 30% bracket: Rs\u00a095,824/yr difference \u00d7 20 years = Rs\u00a019.2\u00a0L. This money comes from nowhere but structuring. Decide before registration." },
      { col:"#ce2c66", head:"Rs 1L/yr extra = loan closes 5.6 years early",  body:"Prepayment hits principal directly. Rs\u00a01L/yr extra saves Rs\u00a020.9\u00a0L in interest and closes the loan 5.6 years early. Maximum impact in the first 13 years \u2014 when 70\u201380% of each EMI is interest." },
      { col:"#0d9488", head:"Buy with full knowledge, not blindly.",          body:"At Rs\u00a018.0\u00a0L/yr income, a Rs\u00a080.0\u00a0L property is 4.4\u00d7 your annual salary. Bankers consider 5\u00d7 comfortable and 7\u00d7 stretched. Structure it right and it works for you for life." },
    ],
    finalLbl: "Free \u00b7 No signup required",
    finalH:   ["See the truth before", "you sign."],
    finalSub: "Every rupee. Every year. Your real life.",
    finalNote:"2025\u201326 rates \u00b7 RBI HPI \u00b7 BIS/FRED \u00b7 Reference only.",
    footTag:  "the real cost, before you sign",
  },
  hi: {
    font:      "'Noto Sans Devanagari','Plus Jakarta Sans',-apple-system,sans-serif",
    tag:       "\u0938\u091a\u094d\u091a\u0940 \u0932\u093e\u0917\u0924, \u0938\u093e\u0907\u0928 \u0938\u0947 \u092a\u0939\u0932\u0947",
    ticker:    ["\u0938\u093f\u0930\u094d\u092b\u093c \u0938\u0930\u0915\u093e\u0930\u0940 \u0921\u0947\u091f\u093e","RBI HPI \u0926\u0930\u0947\u0902","BIS/FRED \u092c\u0947\u0902\u091a\u092e\u093e\u0930\u094d\u0915","\u0930\u093e\u091c\u094d\u092f \u0938\u094d\u091f\u093e\u0902\u092a \u0921\u094d\u092f\u0942\u091f\u0940","GHMC \u0930\u091c\u093f\u0938\u094d\u091f\u094d\u0930\u0947\u0936\u0928","\u0915\u094b\u0908 \u0915\u092e\u0940\u0936\u0928 \u0928\u0939\u0940\u0902","\u0915\u094b\u0908 \u0926\u0932\u093e\u0932 \u0928\u0939\u0940\u0902 \u2014 \u0915\u092d\u0940 \u0928\u0939\u0940\u0902","\u0939\u092e\u0947\u0936\u093e \u092e\u0941\u092b\u093c\u094d\u0924","\u0906\u092a\u0915\u093e \u0921\u0947\u091f\u093e \u0906\u092a\u0915\u0947 \u092a\u093e\u0938","\u0939\u092e \u0906\u092a\u0915\u0947 \u092b\u093c\u0948\u0938\u0932\u0947 \u0938\u0947 \u0915\u0941\u091b \u0928\u0939\u0940\u0902 \u0915\u092e\u093e\u0924\u0947"],
    eyebrow:   "\u0915\u0941\u0932 \u0932\u093e\u0917\u0924 \u0915\u093e \u0938\u091a",
    h1a: "\u0939\u0930 \u0916\u0930\u094d\u091a\u093e\u0964", h1b: "\u092c\u093f\u0928\u093e \u091d\u0942\u0920\u0964",
    sub:       "\u091c\u094b \u091c\u093e\u0928\u0924\u0947 \u0939\u094b \u092d\u0930\u094b\u0964 \u092c\u093e\u0915\u0940 \u0939\u092e \u092c\u0924\u093e\u090f\u0902\u0917\u0947 \u2014 \u0907\u0938 \u0918\u0930 \u0938\u0947 \u0906\u092a\u0915\u0940 \u091c\u093c\u093f\u0902\u0926\u0917\u0940 \u0915\u0948\u0938\u0947 \u092c\u0926\u0932\u0947\u0917\u0940\u0964",
    cardEye:   "Rs 80L \u092a\u094d\u0930\u0949\u092a\u0930\u094d\u091f\u0940 \u00b7 \u0939\u0948\u0926\u0930\u093e\u092c\u093e\u0926",
    listedLbl: "\u092c\u094d\u0930\u094b\u0936\u0930 \u0915\u0940\u092e\u0924", realLbl: "\u0905\u0938\u0932\u0940 \u0915\u0941\u0932 \u0916\u0930\u094d\u091a\u093e",
    badge:     "+Rs 1.21 Cr \u091b\u093f\u092a\u093e \u0939\u0941\u0906",
    cardFoot:  "\u0938\u094d\u091f\u093e\u0902\u092a \u0921\u094d\u092f\u0942\u091f\u0940 \u00b7 20 \u0938\u093e\u0932 \u092c\u094d\u092f\u093e\u091c \u00b7 \u0907\u0902\u091f\u0940\u0930\u093f\u092f\u0930 \u00b7 \u0938\u094b\u0938\u093e\u092f\u091f\u0940 \u00b7 \u091c\u093c\u093f\u0902\u0926\u0917\u0940",
    cta: "\u0938\u091a \u0926\u093f\u0916\u093e\u0913 \u2192", navCta: "\u0938\u091a \u0926\u093f\u0916\u093e\u0913",
    freeNote:  "\u092e\u0941\u092b\u093c\u094d\u0924 \u00b7 \u0915\u094b\u0908 \u0938\u093e\u0907\u0928\u0905\u092a \u0928\u0939\u0940\u0902 \u00b7 \u0939\u0930 \u0930\u0941\u092a\u092f\u093e",
    sec1Lbl:   "\u0915\u094d\u092f\u093e calculate \u0939\u094b\u0924\u093e \u0939\u0948",
    sec1H:     ["\u091a\u093e\u0930 \u091a\u0940\u091c\u093c\u0947\u0902 \u091c\u094b \u0926\u0932\u093e\u0932", "\u0915\u092d\u0940 \u0928\u0939\u0940\u0902 \u092c\u0924\u093e\u0924\u0947\u0964"],
    sec1Sub:   "\u091c\u094b \u091c\u093e\u0928\u0924\u0947 \u0939\u094b \u092d\u0930\u094b\u0964 \u092c\u093e\u0915\u0940 \u0916\u093e\u0932\u0940 \u091b\u094b\u0921\u093c\u094b\u0964 \u0939\u092e \u0938\u092c \u0928\u093f\u0915\u093e\u0932 \u0926\u0947\u0902\u0917\u0947 \u2014 \u0905\u0938\u0932\u0940 \u0938\u0930\u0915\u093e\u0930\u0940 \u0926\u0930\u094b\u0902 \u0914\u0930 \u0906\u092a\u0915\u0940 \u091c\u093c\u093f\u0902\u0926\u0917\u0940 \u0915\u0947 \u0939\u093f\u0938\u093e\u092c \u0938\u0947\u0964",
    pillars: [
      { title:"\u092a\u094d\u0930\u0949\u092a\u0930\u094d\u091f\u0940",      col:"#522de6", desc:"\u0921\u0940\u0932 \u0915\u0940\u092e\u0924, \u0915\u093e\u0930\u094d\u092a\u0947\u091f vs \u0938\u0941\u092a\u0930 \u092c\u093f\u0932\u094d\u091f-\u0905\u092a, \u0905\u0938\u0932\u0940 Rs/sqft, \u0926\u0932\u093e\u0932\u0940, \u0915\u0948\u0936 \u2014 \u0938\u092c \u0938\u093e\u092b\u093c\u0964", tags:["\u0915\u093e\u0930\u094d\u092a\u0947\u091f \u090f\u0930\u093f\u092f\u093e","\u0926\u0932\u093e\u0932\u0940","Rs/sqft","\u0915\u0948\u0936"] },
      { title:"\u0932\u094b\u0928 \u0914\u0930 \u092c\u094d\u092f\u093e\u091c",  col:"#5e5b77", desc:"EMI \u092c\u0938 \u0936\u0941\u0930\u0941\u0906\u0924 \u0939\u0948\u0964 20 \u0938\u093e\u0932 \u092e\u0947\u0902 \u0915\u0941\u0932 \u092c\u094d\u092f\u093e\u091c, \u0932\u094b\u0928 \u092b\u0940\u0938, \u092a\u094d\u0930\u0940\u092a\u0947\u092e\u0947\u0902\u091f \u092b\u093e\u092f\u0926\u093e, 80C \u0914\u0930 24(b) \u091f\u0948\u0915\u094d\u0938 \u092c\u091a\u0924\u0964", tags:["EMI \u0939\u093f\u0938\u093e\u092c","\u0915\u0941\u0932 \u092c\u094d\u092f\u093e\u091c","\u091f\u0948\u0915\u094d\u0938 \u092c\u091a\u0924","\u092a\u094d\u0930\u0940\u092a\u0947\u092e\u0947\u0902\u091f"] },
      { title:"\u0907\u0902\u091f\u0940\u0930\u093f\u092f\u0930",       col:"#ce2c66", desc:"\u092e\u0949\u0921\u094d\u092f\u0941\u0932\u0930 \u0915\u093f\u091a\u0928, \u0905\u0932\u092e\u093e\u0930\u0940, \u092b\u094d\u0932\u094b\u0930\u093f\u0902\u0917, AC, \u092b\u0949\u0932\u094d\u0938 \u0938\u0940\u0932\u093f\u0902\u0917, \u092a\u0947\u0902\u091f\u0964 \u0935\u094b 12\u201315L \u091c\u094b \u092c\u094d\u0930\u094b\u0936\u0930 \u092e\u0947\u0902 \u0928\u0939\u0940\u0902\u0964", tags:["\u092e\u0949\u0921\u094d\u092f\u0941\u0932\u0930 \u0915\u093f\u091a\u0928","\u0905\u0932\u092e\u093e\u0930\u0940","\u092b\u094d\u0932\u094b\u0930\u093f\u0902\u0917","\u0909\u092a\u0915\u0930\u0923"] },
      { title:"\u0906\u092a\u0915\u0940 \u091c\u093c\u093f\u0902\u0926\u0917\u0940",  col:"#0d9488", desc:"\u0936\u093e\u0926\u0940, \u092c\u091a\u094d\u091a\u0947, \u092a\u0922\u093c\u093e\u0908, \u092c\u0941\u091c\u093c\u0941\u0930\u094d\u0917 \u092e\u093e\u0901-\u092c\u093e\u092a, EPF, SIP\u0964 \u0935\u094b \u0939\u093f\u0938\u094d\u0938\u093e \u091c\u094b \u0915\u094b\u0908 calculator \u0928\u0939\u0940\u0902 \u092a\u0942\u091b\u0924\u093e \u2014 \u092a\u0930 \u0938\u092c \u0915\u0941\u091b \u0924\u092f \u0915\u0930\u0924\u093e\u0964", tags:["\u091c\u093c\u093f\u0902\u0926\u0917\u0940 \u0915\u0940 \u0918\u091f\u0928\u093e\u090f\u0902","SIP/NPS/EPF","\u0907\u092e\u0930\u091c\u0947\u0902\u0938\u0940 \u092b\u0902\u0921","\u0915\u093f\u0930\u093e\u092f\u093e vs \u0916\u0930\u0940\u0926"] },
    ],
    privStrong:"\u0906\u092a\u0915\u093e \u0921\u0947\u091f\u093e \u0906\u092a\u0915\u0947 \u092a\u093e\u0938 \u0930\u0939\u0924\u093e \u0939\u0948\u0964",
    privBody:  "\u091c\u094b \u092d\u0940 \u092d\u0930\u0924\u0947 \u0939\u094b \u2014 \u0906\u092f, \u091c\u093c\u093f\u0902\u0926\u0917\u0940 \u0915\u0940 \u0918\u091f\u0928\u093e\u090f\u0902, \u0928\u093f\u0935\u0947\u0936 \u2014 \u0938\u092c \u0906\u092a\u0915\u0947 \u092c\u094d\u0930\u093e\u0909\u091c\u093c\u0930 \u092e\u0947\u0902 calculate \u0939\u094b\u0924\u093e \u0939\u0948\u0964 \u0939\u092e\u093e\u0930\u0947 server \u0915\u094b \u0915\u0941\u091b \u0928\u0939\u0940\u0902 \u091c\u093e\u0924\u093e, \u0915\u0939\u0940\u0902 save \u0928\u0939\u0940\u0902 \u0939\u094b\u0924\u093e, \u0915\u093f\u0938\u0940 \u0915\u094b share \u0928\u0939\u0940\u0902\u0964 \u0916\u093e\u0938\u0915\u0930 personal life data \u0915\u0947 \u0932\u093f\u090f \u2014 \u0939\u092e\u0928\u0947 \u091c\u093e\u0928-\u092c\u0942\u091d\u0915\u0930 \u0910\u0938\u093e \u092c\u0928\u093e\u092f\u093e\u0964",
    sec2Lbl:   "\u0906\u092a\u0915\u093e \u0928\u0924\u0940\u091c\u093e",
    sec2H:     ["\u0939\u0930 \u0930\u0941\u092a\u092f\u093e, \u0935\u091c\u093c\u0928 \u0915\u0947", "\u0939\u093f\u0938\u093e\u092c \u0938\u0947\u0964"],
    sec2Sub:   "\u0906\u092a\u0915\u093e cost pyramid real time \u092e\u0947\u0902 \u092c\u0928\u0924\u093e \u0939\u0948 \u2014 \u0939\u0930 \u0932\u0947\u092f\u0930 \u0915\u0940 \u0915\u0940\u092e\u0924 \u0914\u0930 \u0906\u092a\u0915\u0940 \u0915\u0941\u0932 \u0924\u0938\u094d\u0935\u0940\u0930 \u092e\u0947\u0902 \u0909\u0938\u0915\u093e \u0935\u091c\u093c\u0928 \u0926\u093f\u0916\u093e\u0924\u093e \u0939\u0948\u0964",
    pyrNote:   "\u0906\u092a\u0915\u093e cost pyramid \u2014 \u0939\u0930 \u0930\u0941\u092a\u092f\u093e \u0935\u091c\u093c\u0928 \u0915\u0947 \u0939\u093f\u0938\u093e\u092c \u0938\u0947",
    barLabels: ["\u092a\u094d\u0930\u0949\u092a\u0930\u094d\u091f\u0940","\u0932\u094b\u0928 \u0914\u0930 \u092c\u094d\u092f\u093e\u091c","\u091c\u0947\u092c \u0938\u0947 + \u091b\u093f\u092a\u0947","\u0939\u0930 \u092e\u0939\u0940\u0928\u0947/\u0938\u093e\u0932","\u0907\u0902\u091f\u0940\u0930\u093f\u092f\u0930","\u0938\u0930\u0915\u093e\u0930\u0940"],
    day1Lbl:"\u092a\u0939\u0932\u0947 \u0926\u093f\u0928", day1Sub:"\u0921\u093e\u0909\u0928 \u092a\u0947\u092e\u0947\u0902\u091f + \u0938\u0930\u0915\u093e\u0930\u0940 + \u0907\u0902\u091f\u0940\u0930\u093f\u092f\u0930 + \u0921\u093f\u092a\u094b\u091c\u093c\u093f\u091f",
    moLbl:"\u0939\u0930 \u092e\u0939\u0940\u0928\u093e", moSub:"EMI + \u092e\u0947\u0902\u091f\u0947\u0928\u0947\u0902\u0938 + \u092c\u093e\u0915\u0940 \u0916\u0930\u094d\u091a\u0947",
    sec3Lbl:   "\u0917\u0939\u0930\u0940 \u0938\u092e\u091d",
    sec3H:     ["\u0928\u0902\u092c\u0930 \u0906\u0938\u093e\u0928 \u0939\u0948\u0902\u0964", "\u0905\u0938\u0932\u0940 \u092c\u093e\u0924 \u092e\u0941\u0936\u094d\u0915\u093f\u0932\u0964"],
    sec3Sub:   "\u0939\u092e \u0938\u093f\u0930\u094d\u092f\u093c total \u0928\u0939\u0940\u0902 \u092c\u0924\u093e\u0924\u0947\u0964 \u092c\u0924\u093e\u0924\u0947 \u0939\u0948\u0902 \u0915\u094d\u092f\u093e \u092e\u0924\u0932\u092c \u0939\u0948 \u2014 \u0938\u093e\u0907\u0928 \u0938\u0947 \u092a\u0939\u0932\u0947 \u0915\u094d\u092f\u093e \u0915\u0930\u0928\u093e \u0939\u0948\u0964",
    insights: [
      { col:"#522de6", head:"\u091c\u0949\u0907\u0902\u091f \u0913\u0928\u0930\u0936\u093f\u092a \u0938\u0947 20 \u0938\u093e\u0932 \u092e\u0947\u0902 Rs 19.2 L \u092c\u091a\u0924", body:"\u0926\u094b\u0928\u094b\u0902 \u092e\u093e\u0932\u093f\u0915 Section 24(b) + 80C \u0905\u0932\u0917-\u0905\u0932\u0917 claim \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964 30% bracket \u092e\u0947\u0902: Rs\u00a095,824/\u0938\u093e\u0932 \u00d7 20 \u0938\u093e\u0932 = Rs\u00a019.2\u00a0L\u0964 \u092f\u0947 \u092a\u0948\u0938\u093e \u0938\u093f\u0930\u094d\u092f\u093c structuring \u0938\u0947 \u0906\u0924\u093e \u0939\u0948\u0964 \u0930\u091c\u093f\u0938\u094d\u091f\u094d\u0930\u0940 \u0938\u0947 \u092a\u0939\u0932\u0947 \u0924\u092f \u0915\u0930\u094b\u0964" },
      { col:"#ce2c66", head:"Rs 1L/\u0938\u093e\u0932 \u091c\u093c\u094d\u092f\u093e\u0926\u093e = 5.6 \u0938\u093e\u0932 \u092a\u0939\u0932\u0947 \u0932\u094b\u0928 \u0916\u093c\u0924\u094d\u092e", body:"\u092a\u094d\u0930\u0940\u092a\u0947\u092e\u0947\u0902\u091f \u0938\u0940\u0927\u0947 principal \u092a\u0930 \u0932\u0917\u0924\u093e \u0939\u0948\u0964 Rs\u00a01L/\u0938\u093e\u0932 \u091c\u093c\u094d\u092f\u093e\u0926\u093e \u0938\u0947 Rs\u00a020.9\u00a0L \u092c\u094d\u092f\u093e\u091c \u092c\u091a\u0924\u093e \u0939\u0948 \u0914\u0930 \u0932\u094b\u0928 5.6 \u0938\u093e\u0932 \u092a\u0939\u0932\u0947 \u0916\u093c\u0924\u094d\u092e\u0964 \u0938\u092c\u0938\u0947 \u091c\u093c\u094d\u092f\u093e\u0926\u093e \u0905\u0938\u0930 \u092a\u0939\u0932\u0947 13 \u0938\u093e\u0932\u094b\u0902 \u092e\u0947\u0902\u0964" },
      { col:"#0d9488", head:"\u091c\u093e\u0928\u0915\u0930 \u0916\u0930\u0940\u0926\u094b, \u0905\u0902\u0927\u0947 \u0939\u094b\u0915\u0930 \u0928\u0939\u0940\u0902\u0964", body:"Rs\u00a018.0\u00a0L/\u0938\u093e\u0932 \u0906\u092f \u092a\u0930 Rs\u00a080.0\u00a0L \u092a\u094d\u0930\u0949\u092a\u0930\u094d\u091f\u0940 \u0906\u092a\u0915\u0940 \u0938\u093e\u0932\u093e\u0928\u093e \u0906\u092f \u0915\u093e 4.4\u00d7 \u0939\u0948\u0964 \u092c\u0948\u0902\u0915\u0930\u094d\u0938 5\u00d7 \u0924\u0915 \u0906\u0930\u093e\u092e\u0926\u093e\u092f\u0915 \u0914\u0930 7\u00d7 \u092a\u0930 \u0924\u0928\u093e \u0939\u0941\u0906 \u092e\u093e\u0928\u0924\u0947 \u0939\u0948\u0902\u0964" },
    ],
    finalLbl: "\u092e\u0941\u092b\u093c\u094d\u0924 \u00b7 \u0915\u094b\u0908 \u0938\u093e\u0907\u0928\u0905\u092a \u0928\u0939\u0940\u0902",
    finalH:   ["\u0938\u093e\u0907\u0928 \u0938\u0947 \u092a\u0939\u0932\u0947", "\u0938\u091a \u0926\u0947\u0916\u094b\u0964"],
    finalSub: "\u0939\u0930 \u0930\u0941\u092a\u092f\u093e\u0964 \u0939\u0930 \u0938\u093e\u0932\u0964 \u0906\u092a\u0915\u0940 \u0905\u0938\u0932\u0940 \u091c\u093c\u093f\u0902\u0926\u0917\u0940\u0964",
    finalNote:"2025\u201326 \u0926\u0930\u0947\u0902 \u00b7 RBI HPI \u00b7 BIS/FRED \u00b7 \u0938\u093f\u0930\u094d\u092f\u093c \u091c\u093e\u0928\u0915\u093e\u0930\u0940\u0964",
    footTag:  "\u0938\u091a\u094d\u091a\u0940 \u0932\u093e\u0917\u0924, \u0938\u093e\u0907\u0928 \u0938\u0947 \u092a\u0939\u0932\u0947",
  },
};

const BAR_AMTS = ["Rs 88.0 L","Rs 65.4 L","Rs 23.5 L","Rs 16.2 L","Rs 12.4 L","Rs 5.9 L"];
const BAR_PCTS = ["43.7%","35.7%","12.8%","8.8%","6.8%","3.2%"];
const BAR_BGS  = ["#522de6","#7450E0","#ce2c66","#A8295A","#5e5b77","#4A4A62"];
const BAR_WIDTHS = [100,88,66,50,36,20];

/* ═══════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════ */
export default function LandingPage({ onEnter }) {
  const [lang,   setLang]   = useState("en");
  const [badge,  setBadge]  = useState(false);
  const [barsGo, setBarsGo] = useState(false);
  const t = C[lang];

  /* refs for imperative animation — zero re-renders per frame */
  const wrapRef  = useRef(null);  // outer fade-in wrapper — className never changes
  const cardRef  = useRef(null);  // inner card — ring class toggled imperatively
  const numRef   = useRef(null);  // number span — textContent + color set imperatively
  const phaseRef = useRef(null);  // phase label — textContent set imperatively
  const pyrRef   = useRef(null);
  const ranRef   = useRef(false);
  const pyrRan   = useRef(false);
  const rafRef   = useRef(null);
  const langRef  = useRef("en");

  useEffect(() => { langRef.current = lang; }, [lang]);

  /* initialise number display imperatively after mount */
  useEffect(() => {
    if (numRef.current) {
      numRef.current.textContent = "Rs\u00a080\u00a0L";
      numRef.current.style.color = "#C0C0CC";
    }
    if (phaseRef.current) phaseRef.current.textContent = "\u00a0";
  }, []);

  /* intersection → trigger count */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ranRef.current) {
        ranRef.current = true;
        obs.disconnect();
        setTimeout(runCount, 700);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runCount() {
    const P   = "#522de6";
    const START = 80, END = 201, DUR = 2800;
    const t0  = performance.now();
    let lastIdx = -1;

    /* — all imperative, no setState, zero re-renders during count — */
    if (numRef.current) {
      numRef.current.style.transition = "none";
      numRef.current.style.color      = "#111118";   // dark & visible
    }
    if (cardRef.current) {
      cardRef.current.classList.add("lp-ringing");
      cardRef.current.style.boxShadow = `0 0 0 2px ${P}, 0 8px 40px rgba(82,45,230,.18)`;
    }

    function fmt(v) {
      return v >= 100
        ? "Rs\u00a0" + (v / 100).toFixed(2) + "\u00a0Cr"
        : "Rs\u00a0" + Math.round(v) + "\u00a0L";
    }

    function tick(now) {
      const prog  = Math.min((now - t0) / DUR, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      const v     = START + (END - START) * eased;

      if (numRef.current)   numRef.current.textContent = fmt(v);

      const pi = PHASES.en.findIndex(x => v <= x.end);
      if (pi !== -1 && pi !== lastIdx) {
        lastIdx = pi;
        if (phaseRef.current)
          phaseRef.current.textContent = PHASES[langRef.current]?.[pi]?.text ?? "";
      }

      if (prog < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        /* — settle — */
        if (numRef.current) {
          numRef.current.textContent       = "Rs\u00a02.01\u00a0Cr";
          numRef.current.style.transition  = "color .5s ease";
          numRef.current.style.color       = P;
        }
        if (phaseRef.current) phaseRef.current.textContent = "\u00a0";
        if (cardRef.current) {
          cardRef.current.classList.remove("lp-ringing");
          cardRef.current.style.boxShadow = "0 8px 36px rgba(82,45,230,.12)";
        }
        /* one state change — shows badge */
        setBadge(true);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  /* pyramid intersection */
  useEffect(() => {
    const el = pyrRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !pyrRan.current) {
        pyrRan.current = true;
        setBarsGo(true);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const P    = "#522de6";
  const PK   = "#ce2c66";
  const BG   = "#FAF9FD";
  const GRAD = `linear-gradient(135deg,${P} 0%,${PK} 100%)`;
  const s    = mkS(P, PK, BG, GRAD);

  return (
    <div style={{ ...s.page, fontFamily: t.font }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;700;900&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes lp-up    { to { opacity:1; transform:translateY(0); } }
        @keyframes lp-loop  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes lp-badge { from { opacity:0; transform:scale(.6); } to { opacity:1; transform:scale(1); } }
        @keyframes lp-ring  { 0%,100%{ box-shadow:0 0 0 2px ${P},0 8px 32px rgba(82,45,230,.16) } 50%{ box-shadow:0 0 0 3px ${P},0 14px 48px rgba(82,45,230,.3) } }
        .lp0{opacity:0;transform:translateY(12px);animation:lp-up .55s ease forwards .08s}
        .lp1{opacity:0;transform:translateY(18px);animation:lp-up .6s  ease forwards .24s}
        .lp2{opacity:0;transform:translateY(18px);animation:lp-up .6s  ease forwards .42s}
        .lp3{opacity:0;transform:translateY(18px);animation:lp-up .65s ease forwards .6s}
        .lp4{opacity:0;transform:translateY(18px);animation:lp-up .65s ease forwards .88s}
        .lp-ringing{ animation:lp-ring 1.1s ease infinite !important }
        .lp-pbar{transform:scaleX(0);transform-origin:left center;transition:transform .72s cubic-bezier(.34,1.15,.64,1)}
        .lp-pbar.go{transform:scaleX(1)}
        .lp-rv{opacity:0;transform:translateY(16px);transition:opacity .52s ease,transform .52s ease}
        .lp-rv.in{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}
        .lp-pill{background:#fff;border-radius:13px;border:1px solid rgba(17,17,24,.08);padding:1.3rem 1.4rem;box-shadow:0 1px 3px rgba(0,0,0,.05),0 4px 12px rgba(0,0,0,.03);display:flex;flex-direction:column;gap:.65rem;transition:transform .2s,box-shadow .2s}
        .lp-pill:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(0,0,0,.08),0 12px 28px rgba(0,0,0,.05)}
        .lp-ins{background:#fff;border-radius:13px;border:1px solid rgba(17,17,24,.08);padding:1.15rem 1.35rem;box-shadow:0 1px 3px rgba(0,0,0,.05),0 4px 12px rgba(0,0,0,.03)}
        .lp-btn:hover{transform:translateY(-2px)!important;box-shadow:0 8px 26px rgba(82,45,230,.36)!important}
        .lp-lang:hover{border-color:${P}!important;color:${P}!important}
      `}</style>

      {/* TICKER */}
      <div style={s.ticker}>
        <div style={{ display:"flex", width:"max-content", animation:"lp-loop 38s linear infinite" }}>
          {[0,1].map(k => (
            <span key={k} style={{ display:"inline-flex", alignItems:"center" }}>
              {t.ticker.map((item,i) => (
                <span key={i} style={{ display:"inline-flex", alignItems:"center" }}>
                  <span style={s.tItem}>{item}</span>
                  <span style={s.tSep}>&#9679;</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={s.nav}>
        <div>
          <div style={s.logoN}><span style={{ color:P, fontWeight:900 }}>un</span>-real-estate</div>
          <div style={s.logoT}>{t.tag}</div>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          {["en","hi"].map(l => (
            <button key={l} onClick={() => setLang(l)} className="lp-lang"
              style={{ ...s.langBtn, ...(lang===l ? { borderColor:P, color:P, background:`${P}12` } : {}) }}>
              {l==="en" ? "EN" : "\u0939\u093f"}
            </button>
          ))}
          <button onClick={onEnter} className="lp-btn" style={s.navCta}>{t.navCta}</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <p className="lp0" style={s.eyebrow}>{t.eyebrow}</p>
        <h1 className="lp1" style={s.h1}>{t.h1a}<br/><span style={{ color:P }}>{t.h1b}</span></h1>
        <p className="lp2" style={s.heroSub}>{t.sub}</p>

        {/*
          ┌─ lp3 wrapper ────────────────────────────────────────┐
          │  className="lp3" — NEVER changes after mount.        │
          │  This is the only element with a CSS animation class  │
          │  that we need to protect from restarting.            │
          │                                                       │
          │  ┌─ cardRef ──────────────────────────────────────┐  │
          │  │  className="lp-card" — stable.                 │  │
          │  │  lp-ringing added/removed imperatively.        │  │
          │  │  No CSS animation class here, ever.            │  │
          │  └────────────────────────────────────────────────┘  │
          └──────────────────────────────────────────────────────┘
        */}
        <div className="lp3" style={{ marginBottom:"1.7rem" }}>
          <div ref={cardRef} className="lp-card" style={s.card}>

            <p style={s.cardEye}>{t.cardEye}</p>

            <div style={{ display:"flex", alignItems:"center", gap:"1.6rem" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <span style={s.colLbl}>{t.listedLbl}</span>
                <span style={s.valX}>Rs&nbsp;80&nbsp;L</span>
              </div>
              <span style={{ fontSize:"1rem", color:"#C0C0CC", marginTop:14 }}>&#8594;</span>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <span style={s.colLbl}>{t.realLbl}</span>
                {/*
                  Empty React children → React never touches textContent.
                  Color and text are managed 100% imperatively via numRef.
                  No conflict between React reconciliation and our DOM updates.
                */}
                <span ref={numRef} style={s.valR} />
              </div>
            </div>

            {/* Empty React children → textContent managed imperatively */}
            <p ref={phaseRef} style={s.phaseLbl} />

            <div style={{
              ...s.badge,
              ...(badge
                ? { animation:"lp-badge .42s cubic-bezier(.34,1.56,.64,1) forwards" }
                : { opacity:0, transform:"scale(.62)" })
            }}>
              {t.badge}
            </div>

            <p style={s.cFoot}>{t.cardFoot}</p>
          </div>
        </div>

        <div className="lp4" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".58rem" }}>
          <button onClick={onEnter} className="lp-btn" style={s.ctaBtn}>{t.cta}</button>
          <span style={{ fontSize:".72rem", color:"#B0B0BA" }}>{t.freeNote}</span>
        </div>
      </section>

      <div style={s.div}/>

      {/* PART 1 */}
      <Sec>
        <p style={s.secL}>{t.sec1Lbl}</p>
        <h2 style={s.secH}>{t.sec1H[0]}<br/>{t.sec1H[1]}</h2>
        <p style={s.secS}>{t.sec1Sub}</p>
        <div style={s.grid}>
          {t.pillars.map((pl,i) => (
            <div key={i} className="lp-pill lp-rv" style={{ transitionDelay:`${i*60}ms` }}>
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background:pl.col, flexShrink:0 }}/>
                <span style={{ fontSize:".92rem", fontWeight:700, color:pl.col }}>{pl.title}</span>
              </div>
              <p style={{ fontSize:".82rem", color:"#6B6B7A", lineHeight:1.56 }}>{pl.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {pl.tags.map(tg => <span key={tg} style={s.tag}>{tg}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={s.privCard} className="lp-rv d1">
          <div style={s.lockBox}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                 stroke="#6B6B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="10" rx="2"/>
              <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
            </svg>
          </div>
          <p style={{ fontSize:".82rem", color:"#6B6B7A", lineHeight:1.58 }}>
            <strong style={{ color:"#111118", fontWeight:700 }}>{t.privStrong}</strong>{" "}{t.privBody}
          </p>
        </div>
      </Sec>

      <div style={s.div}/>

      {/* PART 2 */}
      <Sec>
        <p style={s.secL}>{t.sec2Lbl}</p>
        <h2 style={s.secH}>{t.sec2H[0]}<br/>{t.sec2H[1]}</h2>
        <p style={s.secS}>{t.sec2Sub}</p>
        <div style={s.pyrCard} ref={pyrRef}>
          <p style={{ fontSize:".78rem", color:"#B0B0BA", marginBottom:"1.4rem" }}>{t.pyrNote}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {t.barLabels.map((lbl,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:".64rem", fontWeight:700, letterSpacing:".07em", textTransform:"uppercase",
                               color:"#6B6B7A", minWidth:128, flexShrink:0 }}>{lbl}</span>
                <div className={`lp-pbar${barsGo?" go":""}`}
                     style={{ flex:1, maxWidth:`${BAR_WIDTHS[i]}%`, height:44, borderRadius:8, background:BAR_BGS[i],
                              display:"flex", alignItems:"center", justifyContent:"space-between",
                              padding:"0 13px", transitionDelay:`${i*80}ms` }}>
                  <span style={{ fontSize:".84rem", fontWeight:800, color:"#fff", letterSpacing:"-.01em" }}>{BAR_AMTS[i]}</span>
                  <span style={{ fontSize:".68rem", color:"rgba(255,255,255,.62)" }}>{BAR_PCTS[i]}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginTop:"1.6rem" }}>
            {[
              { lbl:t.day1Lbl, val:"Rs 41.8 L", sub:t.day1Sub, c:PK },
              { lbl:t.moLbl,   val:"Rs 58,803",  sub:t.moSub,   c:P  },
            ].map(b => (
              <div key={b.lbl} style={s.totBox}>
                <p style={{ fontSize:".64rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:b.c, marginBottom:5 }}>{b.lbl}</p>
                <p style={{ fontSize:"1.4rem", fontWeight:800, letterSpacing:"-.025em", color:b.c, lineHeight:1 }}>{b.val}</p>
                <p style={{ fontSize:".7rem", color:"#B0B0BA", marginTop:4 }}>{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      <div style={s.div}/>

      {/* PART 3 */}
      <Sec>
        <p style={s.secL}>{t.sec3Lbl}</p>
        <h2 style={s.secH}>{t.sec3H[0]}<br/>{t.sec3H[1]}</h2>
        <p style={s.secS}>{t.sec3Sub}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {t.insights.map((ins,i) => (
            <div key={i} className="lp-ins lp-rv" style={{ transitionDelay:`${i*80}ms` }}>
              <p style={{ fontSize:".92rem", fontWeight:700, color:ins.col, marginBottom:5, lineHeight:1.35 }}>{ins.head}</p>
              <p style={{ fontSize:".82rem", color:"#6B6B7A", lineHeight:1.62 }}>{ins.body}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* FINAL CTA */}
      <Sec center>
        <p style={{ ...s.secL, textAlign:"center" }}>{t.finalLbl}</p>
        <h2 style={{ ...s.secH, textAlign:"center", fontSize:"clamp(1.9rem,5vw,3rem)" }}>
          {t.finalH[0]}<br/>
          <span style={{ background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            {t.finalH[1]}
          </span>
        </h2>
        <p style={{ ...s.secS, textAlign:"center", margin:"0 auto 2rem" }}>{t.finalSub}</p>
        <div style={{ display:"flex", justifyContent:"center" }}>
          <button onClick={onEnter} className="lp-btn" style={s.ctaBtnLg}>{t.cta}</button>
        </div>
        <p style={{ fontSize:".71rem", color:"#B0B0BA", textAlign:"center", marginTop:"1rem" }}>{t.finalNote}</p>
      </Sec>

      <footer style={s.footer}>
        <strong style={{ color:"#6B6B7A" }}>un-real-estate</strong><br/>{t.footTag}
      </footer>
    </div>
  );
}

/* scroll-reveal section */
function Sec({ children, center }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".lp-rv").forEach(el => el.classList.add("in"));
      });
    }, { threshold: 0.06 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} style={{ padding:"72px 2rem", maxWidth:860, margin:"0 auto",
                                 ...(center ? { textAlign:"center" } : {}) }}>
      {children}
    </section>
  );
}

/* styles */
function mkS(P, PK, BG, GRAD) {
  const b  = "1px solid rgba(17,17,24,.08)";
  const sh = "0 1px 3px rgba(0,0,0,.05),0 4px 14px rgba(0,0,0,.03)";
  return {
    page:     { minHeight:"100vh", background:BG, color:"#111118", overflowX:"hidden", WebkitFontSmoothing:"antialiased" },
    ticker:   { background:P, overflow:"hidden", height:34, display:"flex", alignItems:"center" },
    tItem:    { whiteSpace:"nowrap", fontSize:".68rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.88)", padding:"0 .22rem" },
    tSep:     { color:"rgba(255,255,255,.28)", fontSize:".5rem", margin:"0 1.4rem" },
    nav:      { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 2rem", borderBottom:b, background:BG, position:"sticky", top:0, zIndex:50, backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)" },
    logoN:    { fontSize:"1.05rem", letterSpacing:"-.02em", fontWeight:400, lineHeight:1 },
    logoT:    { fontSize:".62rem", color:"#B0B0BA", marginTop:2 },
    langBtn:  { padding:"5px 11px", borderRadius:7, border:"1.5px solid rgba(17,17,24,.16)", background:"transparent", fontSize:".72rem", fontWeight:700, cursor:"pointer", color:"#6B6B7A", transition:"border-color .18s, color .18s, background .18s" },
    navCta:   { padding:"7px 16px", borderRadius:8, border:"none", background:GRAD, color:"#fff", fontSize:".77rem", fontWeight:700, cursor:"pointer", boxShadow:"0 3px 12px rgba(82,45,230,.22)", transition:"transform .2s, box-shadow .2s" },
    hero:     { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"100px 1.5rem 80px" },
    eyebrow:  { fontSize:".66rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:"#B0B0BA", marginBottom:"1.3rem" },
    h1:       { fontSize:"clamp(3rem,9vw,6.6rem)", fontWeight:900, lineHeight:1.0, letterSpacing:"-.035em", marginBottom:"1.1rem" },
    heroSub:  { fontSize:"clamp(.9rem,2vw,1.08rem)", color:"#6B6B7A", maxWidth:500, lineHeight:1.7, marginBottom:"2.4rem" },
    card:     { background:"#fff", borderRadius:16, border:b, boxShadow:sh, padding:"1.8rem 2.6rem", display:"inline-flex", flexDirection:"column", alignItems:"center", gap:"1.15rem", minWidth:348 },
    cardEye:  { fontSize:".63rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#B0B0BA" },
    colLbl:   { fontSize:".66rem", fontWeight:600, color:"#B0B0BA" },
    valX:     { fontSize:"1.85rem", fontWeight:800, letterSpacing:"-.03em", lineHeight:1, color:"#C0C0CC", textDecoration:"line-through", textDecorationColor:"rgba(204,51,102,.45)", textDecorationThickness:2 },
    valR:     { fontSize:"1.85rem", fontWeight:800, letterSpacing:"-.03em", lineHeight:1, display:"block", minWidth:"8ch", textAlign:"center" },
    phaseLbl: { fontSize:".68rem", fontWeight:500, color:"#B0B0BA", minHeight:"1.1em", fontStyle:"italic" },
    badge:    { padding:"5px 14px", borderRadius:8, background:"rgba(204,51,102,.1)", fontSize:".76rem", fontWeight:700, color:PK },
    cFoot:    { fontSize:".62rem", color:"#B0B0BA", borderTop:b, paddingTop:".8rem", width:"100%", textAlign:"center", letterSpacing:".025em" },
    ctaBtn:   { padding:"13px 32px", borderRadius:12, border:"none", background:GRAD, color:"#fff", fontSize:".93rem", fontWeight:800, cursor:"pointer", boxShadow:"0 4px 16px rgba(82,45,230,.25)", transition:"transform .2s, box-shadow .2s" },
    ctaBtnLg: { padding:"15px 40px", borderRadius:13, border:"none", background:GRAD, color:"#fff", fontSize:".96rem", fontWeight:800, cursor:"pointer", boxShadow:"0 5px 20px rgba(82,45,230,.26)", transition:"transform .2s, box-shadow .2s" },
    div:      { maxWidth:860, margin:"0 auto", height:1, background:"rgba(17,17,24,.08)" },
    secL:     { fontSize:".67rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:"#6B6B7A", marginBottom:".9rem" },
    secH:     { fontSize:"clamp(1.7rem,4vw,2.45rem)", fontWeight:800, letterSpacing:"-.025em", lineHeight:1.1, marginBottom:"1rem" },
    secS:     { fontSize:".92rem", color:"#6B6B7A", maxWidth:500, lineHeight:1.68, marginBottom:"2rem" },
    grid:     { display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1rem" },
    tag:      { fontSize:".66rem", fontWeight:600, padding:"3px 9px", borderRadius:6, background:"rgba(17,17,24,.05)", color:"#6B6B7A" },
    privCard: { marginTop:"1rem", background:"#fff", borderRadius:13, border:b, padding:"1.2rem 1.4rem", boxShadow:sh, display:"flex", alignItems:"flex-start", gap:11 },
    lockBox:  { width:27, height:27, borderRadius:7, border:"1.5px solid rgba(17,17,24,.14)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 },
    pyrCard:  { background:"#fff", borderRadius:15, border:b, padding:"1.9rem", boxShadow:sh },
    totBox:   { padding:"1.1rem 1.25rem", borderRadius:10, background:"rgba(17,17,24,.03)", border:b },
    footer:   { textAlign:"center", padding:"1.3rem 2rem 2rem", borderTop:b, fontSize:".7rem", color:"#B0B0BA", lineHeight:1.9 },
  };
}
