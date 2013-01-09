do ->
	Lifegame = ->
		self = this

		# universe size
		this.width = 20
		this.height = 20

		# universe
		this.field = ko.observableArray()

		this.initialize = ->
			# create universe
			for x in [0..this.width-1]
				row = ko.observableArray()
				for y in [0..this.height-1]
					row.push 
						status: ko.observable "dead"
						x: x
						y: y
				this.field.push row

		# if cell is alive then cell die else if cell is dead then cell reborn		
		this.reverseCell = (x, y)->
			status = self.field()[x]()[y].status()
			if status is "dead"
				self.field()[x]()[y].status "alive"
			else 
				self.field()[x]()[y].status "dead"
		
		# calc next generation
		this.next = ->
			# pickup cell will reverse
			reverseCells = []
			for x in [0..this.width-1]
				for y in [0..this.height-1]
					aliveCells = 0
					status = self.field()[x]()[y].status()
					for grid in self.adjoinArray x, y # sum alive cell at adjoin cells
						aliveCells += 1 if self.field()[grid.x]()[grid.y].status() is "alive"
					if status is "dead" and aliveCells is 3 # if just three adjoin cell is alive then that cell is born
						reverseCells.push
							x: x
							y: y
					else if status is "alive" and aliveCells <= 1 # if depopulation or overpopulation then that cell is dead
						reverseCells.push
							x: x
							y: y
					else if status is "alive" and aliveCells >= 4 # if overpopulation or overpopulation then that cell is dead
						reverseCells.push
							x: x
							y: y
			# pickuped cells reverse
			for grid in reverseCells
				self.reverseCell grid.x, grid.y

		this.adjoinArray = (x, y)->
			# make template adjoin cell grid
			res = [
				{
					x: x-1
					y: y-1
				}
				{
					x: x
					y: y-1
				}
				{
					x: x+1
					y: y-1
				}
				{
					x: x-1
					y: y
				}
				{
					x: x+1
					y: y
				}
				{
					x: x-1
					y: y+1
				}
				{
					x: x
					y: y+1
				}
				{
					x: x+1
					y: y+1
				}
			]

			# calc for closed universe
			for grid in res
				if grid.x < 0
					grid.x += self.width
				else if grid.x >= self.width
					grid.x -= self.width
				if grid.y < 0
					grid.y += self.height
				else if grid.y >= self.height
					grid.y -= self.height
			res
		
		this.play = ->
			arg = arguments
			self.next()
			self.timerId = setTimeout arg.callee, 300

		this.stop = ->
			clearTimeout self.timerId

		this.timerId = 0

		this

	lifegame = new Lifegame()

	lifegame.initialize()

	ko.applyBindings lifegame