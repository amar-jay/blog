import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/shadcn/ui/menubar";

export default function MenubarComponent() {
	return (
		<Menubar className="flex justify-around px-10">
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent className="border-textColor/50 bg-background text-textColor">
					<MenubarItem className="hover:bg-accent/50">
						New Tab <MenubarShortcut>⌘T</MenubarShortcut>
					</MenubarItem>
					<MenubarItem className="hover:bg-accent/50">
						New Window <MenubarShortcut>⌘N</MenubarShortcut>
					</MenubarItem>
					<MenubarItem disabled>New Incognito Window</MenubarItem>
					<MenubarSeparator />
					<MenubarItem className="hover:bg-accent/50">
						Print... <MenubarShortcut>⌘P</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent className="border-textColor/50 bg-background text-textColor">
					<MenubarItem className="hover:bg-accent/50">
						Undo <MenubarShortcut>⌘Z</MenubarShortcut>
					</MenubarItem>
					<MenubarItem className="hover:bg-accent/50">
						Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent className="border-textColor/50 bg-background text-textColor">
					<MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
					<MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
					<MenubarSeparator />
					<MenubarItem inset>
						Reload <MenubarShortcut>⌘R</MenubarShortcut>
					</MenubarItem>
					<MenubarItem disabled inset>
						Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem inset>Toggle Fullscreen</MenubarItem>
					<MenubarSeparator />
					<MenubarItem inset>Hide Sidebar</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Profiles</MenubarTrigger>
				<MenubarContent className="border-textColor/50 bg-background text-textColor">
					<MenubarRadioGroup value="benoit">
						<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
						<MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
						<MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
					</MenubarRadioGroup>
					<MenubarSeparator />
					<MenubarItem inset>Edit...</MenubarItem>
					<MenubarSeparator />
					<MenubarItem inset>Add Profile...</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
