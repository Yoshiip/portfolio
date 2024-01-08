<svelte:head>
    <title>Compétences • Tourneur Aymeri</title>
    <meta name="description" content="Portfolio de Tourneur Aymeri">
</svelte:head>

<script>
    // @ts-nocheck
    import tools from '$lib/tools.json'
    import projects from '$lib/projects.json'

    function getProjectsFromTool(tool_name) {
        let projects_using_tool = [];
        projects.forEach(project => {
            if(Object.values(project.tools).includes(tool_name)) {
                projects_using_tool.push(project.name);
            }
        });
        return projects_using_tool;
    }
</script>


<main>
    <img src="/images/skills/skills_header.jpg" alt="Skills" class="header">
    <div class="skills_container">
        {#each Object.keys(tools) as tool}
            {#if (tools[tool].mastery ?? 0) != -1}
                <div class="skill" class:selected={(tools[tool].mastery ?? 0)}>
                    {#if Object.hasOwn(tools[tool], "icon")}
                        <img src={"/images/tools/" + tools[tool].icon} alt="" srcset="">
                    {:else}
                        <img src={"/images/tools/" + tool + ".svg"} alt="" srcset="">
                    {/if}
                    <h1>{tools[tool].name}</h1>
                    <p>{tools[tool].description}</p>
                    <div class="linked_projects">
                        <h4>Projets liés</h4>
                        <ul>
                            {#each getProjectsFromTool(tool) as project_name}
                                <li>{project_name}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</main>

<style>
    main {
        margin-top: 80px;
        text-align: center;
    }

    .header {
        width: calc(100% - 64px);
        max-width: 800px;
        border-radius: 16px;
        margin-left: 32px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

    .skills_container {
        margin: 32px;
        width: calc(100% - 64px);
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
        gap: 8px;
    }

    .skill {
        width: 280px;
        background-color: white;
        border-radius: 8px;
        padding-top: 8px;
        animation: 0.25s;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid rgb(204, 204, 204);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .skill > img {
        width: 64px;
    }


    .skill > h1 {
        text-align: center;
    }

    .skill > p {
        text-align: justify;
        margin: 8px;
    }

    .linked_projects {
        margin: 8px;
        width: calc(100% - 16px);
        background-color: rgb(35, 38, 61);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
    }

    .linked_projects > h4 {
        padding: 0;
        margin: 0;
    }

    .selected {
        box-shadow: 0px 0px 8px 0px #ffa600;
    }
</style>