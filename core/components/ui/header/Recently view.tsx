import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

const HoverCardDemo = () => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a
        className="ImageTrigger"
        href="https://twitter.com/radix_ui"
        target="_blank"
        rel="noreferrer noopener"
      >
        <p className="Image normal">Hi</p> {/* Fixed invalid attribute */}
      </a>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content className="HoverCardContent" sideOffset={5}>
        <div className="hover-card-container">
          <img
            className="Image large"
            src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
            alt="Radix UI"
          />
          <div className="hover-card-details">
            <div>
              <div className="Text bold">Radix UI</div>
              <div className="Text faded">@radix_ui</div>
            </div>
            <div className="Text bio">
              Components, icons, colors, and templates for building high-quality, accessible UI. Free and open-source.
            </div>
            <div className="extra-info">
              <div className="Text location">📍 San Francisco, CA</div>
              <div className="Text website">
                🌐 <a href="https://radix-ui.com">radix-ui.com</a>
              </div>
              <div className="Text join-date">Joined January 2021</div>
            </div>
            <div className="Text followers-info" style={{ display: "flex", gap: 15 }}>
              <div style={{ display: "flex", gap: 5 }}>
                <div className="Text bold">0</div> <div className="Text faded">Following</div>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                <div className="Text bold">2,900</div> <div className="Text faded">Followers</div>
              </div>
            </div>
          </div>
        </div>
        <HoverCard.Arrow className="HoverCardArrow" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default HoverCardDemo;
